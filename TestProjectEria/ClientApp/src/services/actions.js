const baseUrl = "https://localhost:44390/";

function sendApiRequest(request, options) {
    return (fetch(request, options).then(response => {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    }))
}

function hasParam(request, key, value) {
    if (value != null && value !=='') {
        request.searchParams.append(key, value);
    }
}

function createRequestOptions(method = 'get', body = {}) {
    let options = { 'method': method }

    if (options.method == 'post') {
        options['headers'] = { 'Content-Type': 'application/json' };
        options['body'] = JSON.stringify(body);
    }

    return options;
}

export const Api = (url, params, options) => {
    const request = new URL(url, baseUrl);
    Object.keys(params)
        .forEach(
            key => hasParam(request, key, params[key])
        );
    return sendApiRequest(request, options);
};

export const GetApi = (url, params = {}) => {
    return Api(url, params, {});
};

export const PostApi = (url, body) => {
    console.log(createRequestOptions('post', body));
    return Api(url, {}, createRequestOptions('post', body));
}

export const DeleteApi = (url) => {
    return Api(url, createRequestOptions('delete'));
}

export default Api;