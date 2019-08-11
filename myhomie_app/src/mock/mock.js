import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import {postList, commentList} from './data/postList';

export default {
    start() {
        let mock = new MockAdapter(axios);//创建mockAdapter
        //获取post列表
        mock.onGet('/post/list').reply((config) => {
            let {num} = config.params;
            let postArray = [];
            let postsArray = [];
            postList.forEach((post, index) => {
                if (index % 10 === 9) {
                    postArray.push(post);
                    postsArray.push(postArray);
                    postArray = [];
                } else {
                    postArray.push(post);
                }
            });
            if (postArray != []) postsArray.push(postArray);
            if (num >= postsArray.length) return;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        posts: postsArray[num]
                    }]);
                }, 200);
            });
        });
        //获取单个post
        mock.onGet('/post/detail').reply((config) => {
            let {postId} = config.params;
            let mockpost = postList.find(post => {
                if (post.postId === postId) return post;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        post: mockpost
                    }]);
                }, 200);
            });
        });
        //获取一个post下面的commentList
        mock.onGet('/post/commentList').reply((config) => {
            let {postId} = config.params;
            let mockcommentList = [];
            commentList.find(comment => {
                // if(comment.postId === postId) return comment;
                if (comment.valid === 1) mockcommentList.push(comment);
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        commentList: mockcommentList
                    }]);
                }, 200);
            });
        });
        //获取一个单个comment
        mock.onGet('/post/comment').reply((config) => {
            let {commentId} = config.params;
            let mockcomment = commentList.find(comment => {
                if (comment.commentId === commentId) return comment;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        comment: mockcomment
                    }]);
                }, 200);
            });
        });
        // 新增一条post
        mock.onPost('/post/addPost').reply(config => {
            let {inputValue} = JSON.parse(config.data);
            postList.push({
                postId: Mock.Random.id(),
                userId: Mock.Random.id(),
                postType: Mock.Random.integer(0, 2),/////0,1,2代表的是新闻 信息 发现
                title: inputValue.title,
                content: Mock.Random.paragraph(),
                createdTime: Mock.Random.time(),
                category: Mock.Random.word(),/////分别属于哪个分类里面
                seen: Mock.Random.integer(),
                location: inputValue.location,
                video: Mock.Random.url(),
                tag: Mock.Random.range(),
                valid: 1,
            });
            // console.log(postList);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200]);
                }, 200);
            });
        });
    }
}