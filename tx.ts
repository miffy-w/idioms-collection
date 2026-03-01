import axios from "axios";

const imgUrl = 'https://ark-content-generation-v2-cn-beijing.tos-cn-beijing.volces.com/doubao-seedream-3-0-t2i/0217723600204207e77ed289647c83a4aab1892556246c5502ed7_0.jpeg?X-Tos-Algorithm=TOS4-HMAC-SHA256&X-Tos-Credential=AKLTYWJkZTExNjA1ZDUyNDc3YzhjNTM5OGIyNjBhNDcyOTQ%2F20260301%2Fcn-beijing%2Ftos%2Frequest&X-Tos-Date=20260301T101343Z&X-Tos-Expires=86400&X-Tos-Signature=8766dd11813d4eb0ae04c4d8727ccee705f84f9a833d40343f786ae7554f2674&X-Tos-SignedHeaders=host';

axios.get(imgUrl, {
    responseType: 'arraybuffer',
    timeout: 60000,
}).then(res => {
    console.log(res.data)
}).catch(err => {
    console.log(err)
});
