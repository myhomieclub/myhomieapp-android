import Mock from 'mockjs';

const count = 34;
///////postList 帖子数据
let postList = [];
for (let i = 0; i < count; i++) {
    postList.push(Mock.mock({
        postId: Mock.Random.id(),
        userId: Mock.Random.id(),
        postType: Mock.Random.integer(0, 2),/////0,1,2代表的是新闻 信息 发现
        title: Mock.Random.title(),
        content: Mock.Random.paragraph(),
        createdTime: Mock.Random.time(),
        category: Mock.Random.word(),/////分别属于哪个分类里面
        seen: Mock.Random.integer(1, 100),
        location: Mock.Random.region(),
        video: Mock.Random.url(),
        tag: Mock.Random.range(),
        valid: Mock.Random.integer(0, 1),
    }))
}
////////评论数据
let commentList = [];
for (let i = 0; i < count; i++) {
    commentList.push(Mock.mock({
        commentId: Mock.Random.id(),
        userId: Mock.Random.id(),
        postId: Mock.Random.id(),
        createdTime: Mock.Random.time(),
        groupId: Mock.Random.id(),
        mentionId: Mock.Random.id(),
        content: Mock.Random.sentence(),
        pic: Mock.Random.url(),
        likes: Mock.Random.integer(0, 100),
        valid: Mock.Random.integer(0, 1),
    }))
}
export {
    postList, commentList
}


/*
///////Mock.Random随机生成////////
Mock.Random.id()  //18位身份证
Mock.Random.guid()  //18位全局唯一标识符，例6F9619FF-8B86-D011-B42D-00C04FC964FF
Mock.Random.area() Mock.Random.region()  //中国大区 省
Mock.Random.email()  //邮箱
Mock.Random.url()  //url
Mock.Random.first() Mock.Random.last() Mock.Random.name()  //英文名 英文姓 英文姓名
Mock.Random.title()  //标题，默认三到七个单词，可自定义(min,max) (length)，下同
Mock.Random.word()  //单词
Mock.Random.sentence()  //句子
Mock.Random.paragraph()  //段落
Mock.Random.color()  //color
Mock.Random.image(size, background, foreground, format, text)  //Random.image('200x100', '#ffcc33', '#FFF', 'png', '!')
Mock.Random.dataImage(size, text)   //Random.dataImage('300x100', 'Hello Mock.js!')
Mock.Random.date(format) Mock.Random.time(format) Mock.Random.datetime(format)
Mock.Random.boolean() .natural() .integer() .float() .character() .string() .range()
//布尔值，自然数，整数，浮点数，字符，字符串，整形数组
//lower: "abcdefghijklmnopqrstuvwxyz",upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
//number: "0123456789",symbol: "!@#$%^&*()[]" 字符和字符串可以选填这些值
*/