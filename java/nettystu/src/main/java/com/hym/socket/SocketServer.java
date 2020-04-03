package com.hym.socket;

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 传统IO特点：
 * 阻塞点
 * server.accept();
 * inputStream.read(bytes);
 *
 * 单线程情况下只能有一个客户端
 *
 *
 * 用线程池可以有多个客户端连接，但是非常消耗性能
 */

public class SocketServer {
    
    public static void main(String[] args) throws Exception{
        ServerSocket serverSocket = new ServerSocket(10001);
        ExecutorService newCachedThreadPool = Executors.newCachedThreadPool();
        System.out.println("服务器启动........");

        while (true) {
            //获取一个套接字（阻塞）
            final Socket socket = serverSocket.accept();
            System.out.println("来了一个新客服端");

            newCachedThreadPool.execute(new Runnable() {
                public void run() {

                    handler(socket);
                }
            });

        }
    }

    private static void handler(Socket socket) {
        try {
            byte[] bytes = new byte[1024];
            InputStream inputStream = socket.getInputStream();

            while (true) {
                //读取数据（阻塞）
                int read =inputStream.read(bytes);
                if (read != -1) {
                    System.out.println(new String(bytes,0,read));
                }else {
                    break;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                System.out.println("socket关闭");
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

}
