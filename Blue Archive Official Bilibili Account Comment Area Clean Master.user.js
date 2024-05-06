// ==UserScript==
// @name         Blue Archive Official Bilibili Account Comment Area Clean Master
// @name:zh-CN   蔚蓝档案B站官方账号动态评论区清理大师
// @namespace    http://tampermonkey.net/
// @version      2024-05-06
// @description  try to take over the world!
// @author       You
// @match        https://t.bilibili.com/?spm_id_from=*
// @match        https://t.bilibili.com
// @match        https://t.bilibili.com/*
// @match        https://space.bilibili.com/3493265644980448*
// @match        https://space.bilibili.com/3493282386545566*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @require      http://code.jquery.com/jquery-3.5.1.js
// ==/UserScript==

'use strict';
/* eslint-env jquery */

/* Functions */
// 单独动态页面
function bansig(){
    let upname=$('.bili-dyn-title__text.fs-large')[0].innerText;
    if(upname=='蔚蓝档案'||upname=='蔚蓝档案小助理'){
        $('.reply-warp>.reply-list').remove();
        console.log('bansig');
    };
};
// 官方空间页面
function bansp1(){
    if($('.reply-warp>.reply-list').length>0){
        $('.reply-warp>.reply-list').remove();
        console.log('bansp1');
    }
    else if($('.bili-dyn-item__action>.comment').length>0){
        $('.bili-dyn-item__action>.comment').remove();
        console.log('bansp1');
    };
};
// 自己的动态主页
function bandsh(){
    for (let i = 0; i < $('.bili-dyn-title__text.fs-large').length; i++) {
        let upname=$('.bili-dyn-title__text.fs-large')[i].innerText;
        if(upname=='蔚蓝档案'||upname=='蔚蓝档案小助理'){
            if($('.reply-warp>.reply-list').length>0){
                for(let i = 0; i < $('.reply-warp>.reply-list').length; i++){
                    let ifname=$('.reply-warp>.reply-list').parent().parent().parent().parent().parent().parent()
                    .children(".bili-dyn-item__main").children(".bili-dyn-item__header").children(".bili-dyn-title").children(".bili-dyn-title__text")[i].innerText;
                    if(ifname=='蔚蓝档案'||ifname=='蔚蓝档案小助理'){
                        $('.reply-warp>.reply-list').parent().parent().parent().parent().parent().parent()
                            .children(".bili-dyn-item__panel").children(".bili-dyn-comment").children(".bili-comment")
                            .children(".comment-container").children(".reply-warp").children(".reply-list").remove();
                        console.log('bandsh');
                    };
                };
            };
        };
    };
};


/* Hooks */
if (window.location.href.indexOf('t.bilibili.com') > -1) {
    if(window.location.href !='https://t.bilibili.com/' &&window.location.href.indexOf('t.bilibili.com/?spm_id_from')==-1){
        window.onload=function (){
            bansig();
        };
    }
    else{
        $(document)
            .mousemove(function () { bandsh(); })
            .on('mousewheel',function() { bandsh(); });
    };
}
else if(window.location.href.indexOf('space.bilibili.com')>-1){
    $(document).mousemove(function () {
        if (window.location.href.indexOf('space.bilibili.com/3493265644980448/dynamic') > -1 || window.location.href.indexOf('space.bilibili.com/3493282386545566/dynamic') > -1) {
            bansp1();
        };
    });
};
