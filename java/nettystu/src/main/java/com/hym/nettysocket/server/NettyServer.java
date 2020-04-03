package com.hym.nettysocket.server;

import java.net.InetSocketAddress;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.jboss.netty.bootstrap.ServerBootstrap;
import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.channel.ChannelPipelineFactory;
import org.jboss.netty.channel.Channels;
import org.jboss.netty.channel.socket.nio.NioServerSocketChannelFactory;
import org.jboss.netty.handler.codec.string.StringDecoder;
import org.jboss.netty.handler.codec.string.StringEncoder;
/**
 * netty服务端入门
 *
 * 1、netty服务端hello world案例
 *
 * SimpleChannelHandler 处理消息接收和写
 * {
 * 	messageReceived接收消息
 *
 * 	channelConnected新连接，通常用来检测IP是否是黑名单
 *
 * 	channelDisconnected链接关闭，可以再用户断线的时候清楚用户的缓存数据等
 * }
 *
 * 2、netty客户端hello world案例
 *
 * channelDisconnected与channelClosed的区别？
 *
 * channelDisconnected只有在连接建立后断开才会调用
 * channelClosed无论连接是否成功都会调用关闭资源
 *
 */
public class NettyServer {

    public static void main(String[] args) {

        //服务类
        ServerBootstrap bootstrap = new ServerBootstrap();

        //boss线程监听端口，worker线程负责数据读写
        ExecutorService boss = Executors.newCachedThreadPool();
        ExecutorService worker = Executors.newCachedThreadPool();

        //设置niosocket工厂
        bootstrap.setFactory(new NioServerSocketChannelFactory(boss, worker));

        //设置管道的工厂
        bootstrap.setPipelineFactory(new ChannelPipelineFactory() {

            public ChannelPipeline getPipeline() throws Exception {

                ChannelPipeline pipeline = Channels.pipeline();
                pipeline.addLast("decoder", new StringDecoder());
                pipeline.addLast("encoder", new StringEncoder());
                pipeline.addLast("helloHandler", new HelloHandler());
                return pipeline;
            }
        });

        bootstrap.bind(new InetSocketAddress(10101));

        System.out.println("start!!!");

    }

}
