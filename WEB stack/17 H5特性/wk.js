//3 接收
this.onmessage = (env) => {
    console.log(env);
    //4 处理任务
    let sum = env.data.n1 + env.data.n2;

    //5 返回
    this.postMessage(sum);
};