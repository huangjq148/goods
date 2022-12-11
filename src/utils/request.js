import axios from 'axios';
import { getAccessToken } from './auth';

// axios 配置及拦截器
axios.defaults.timeout = 30000;

// 指定请求地址

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : '/server';

// 添加请求拦截器
axios.interceptors.request.use(
    async (config) => {
        // 没有刷新token或接口本身无需用户验证
        if (config?.skipAuth) return config;
        const token = getAccessToken();
        // 获取用户token，用于校验
        if (token) {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 指定 axios 请求类型
        // @ts-ignore
        config.headers['Content-Type'] = 'application/json;charset=utf-8';

        return config;
    },
    (error) => Promise.reject(error),
);

// 添加响应拦截器，拦截登录过期或者没有权限

axios.interceptors.response.use(
    (response) => {
        if (response.data.status === "success") {
            return Promise.resolve(response.data);
        }

        console.error(response.data.message)
        return Promise.reject(new Error(response.data.message));
    },
    async (error) => {
        if (error?.response?.data.code === 401) {
            window.location.href = "/#/login"
        }
        return Promise.reject(error?.response?.data || error);
    },
);

// 统一发起请求的函数, 暂时只用来 mock
export default function request(url, options) {
    if (options) {
        options.url = url;
    } else {
        options = { url };
    }

    return axios.request(options).then((res) => res.data);
}
