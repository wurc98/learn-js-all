## buffer 缓存


1. ArrayBuffer
通用的，固定长度的原始二进制数据缓冲区. 可以理解为一块内存

    1.1 ArrayBuffer能狗直接操作吗
    
    * 不能直接操作. 通过类型数组对象来操作(TypedArray). 将缓存区中的数据表示为特定的格式.

    * 具体存什么,还需要其他的声明.

2. Unit8Array

3. ArrayBuffer 和 TypeArray 的关系时什么？

    TypedArray: Unit8Array,Int32Array,Int16Array,
    ArrayBuffer:本身是一个 0 和1 存放在一行里的一个集合

    3.1 可以用一个Int8的确定类型数组来分离存放8位的二进制字节。

    3.2 
4. ArrayBuffer扮演了一个原生内存的角色。


## NodeJs  Buffer

Buffer 实现了Unit8Array 的Api。

Buffer的实例 => 整型数组

Buffer 的大小是固定的，在创建的时候就确定了，不能调整。


### Tips

1. 当调用Buffer.allocUnsafe()时，被分配的内存段时未初始化的。

    内存的分配非常快，但分配的内存段可能包含潜在的旧数据。具有明显的性能优势，但是使用不当，会给程序引入安全漏洞。


## buffer 与 字符编码

Buffer的实例一般用于表示编码字符的序列，UTF-8，base64,十六进制编码数据.

Nodejs中目前支持的字符编码

1. ascii - 仅支持7位的ASCII数据
2. utf8 - 多字节编码的Unicode字符，html
3. base64 -  