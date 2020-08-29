第二个要注意的是D:\\demo.txt这个路径。我们通常使用windows作为编码的系统，而windows中路径分隔符是单个 \ ，但是在java代码中，需要添加一个\作为转义符，这样才能被java识别为路径分隔符。注意，我这里强调了windows系统，因为好死不死，在linux里面的路径分隔符恰恰是反的 / 。由于我们的代码最终会放在服务器上运行，所以我们不能将路径写死成只有windows系统可以识别的 \\ 。我们需要一个在windows里是 \ ，在linux里是 / 的方法。

这个方法File类也帮我们做好了，就是File.separator，将上面的路径改造为平台无关的写法就是

"D:" + File.separator + "demo.txt"
