function httpReq(method_name, path_str, body_map){
	let req_map = {
		method : method_name,
		url : 'http://127.0.0.1:5173' + (path_str ? path_str : '')
	};

	if(body_map){
		req_map.data = body_map;
	}
	// eslint-disable-next-line no-undef
	return axios(req_map)
	.then(function(response) {
		return response.data;
	})
	.catch(function(error) {
		console.error(error);
	})
	;
}

export default httpReq;