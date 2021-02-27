// 文件来源https://www.gudian.org/tools/tu.html
	/************检测粘贴上传图片**************/
        document.addEventListener('paste', function (event) {
            // console.log(event);
            var isChrome = false;
            if (event.clipboardData || event.originalEvent) {
            //某些chrome版本使用的是event.originalEvent
            var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
            if(clipboardData.items){
                // for chrome
                var  items = clipboardData.items,
                len = items.length,
                blob = null;
                isChrome = true;
                for (var i = 0; i < len; i++) {
                    // console.log(items[i]);
                    if (items[i].type.indexOf("image") !== -1) {
                        //getAsFile() 此方法只是living standard firefox ie11 并不支持
                        blob = items[i].getAsFile();
                    }
                }
                if(blob!==null){
                    mdui.confirm('检测到了您粘贴了图片是否上传?','提示:',function(){
                        var fd = new FormData(document.forms[0]);
                        fd.append("image", blob, 'copy.png');
                    //创建XMLHttpRequest对象
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST','https://image.kieng.cn/upload.html?type=ali' );
                    xhr.onload = function () {
                        if ( xhr.readyState === 4 ) {
                            var data = JSON.parse( xhr.responseText );
                            if (data.code === 200 ) {
                                app.msg(true,data.data.name+"上传完成");
                                $("#code-url ul").prepend("<li>" + data.data.url + "<i class=\"copy iconfont icon-copy\"></i></li>");
                                $("#code-html ul").prepend("<li>&lt;img src=\"" + data.data.url + "\" alt=\"" + data.data.name + "\" title=\"" + data.data.name + "\" /&gt;<i class=\"copy iconfont icon-copy\"></i></li>");
                                $("#code-bbcode ul").prepend("<li>[img]" + data.data.url + "[/img]<i class=\"copy iconfont icon-copy\"></i></li>");
                                $("#code-markdown ul").prepend("<li>![" + data.data.name + "](" + data.data.url + ")<i class=\"copy iconfont icon-copy\"></i></li>");
                                $("#code-markdown-with-link ul").prepend("<li>[![" + data.data.name + "](" + data.data.url + ")](" + data.data.url + ")<i class=\"copy iconfont icon-copy\"></i></li>");
                                $(".success-info").css("width", "inherit");
                                if (data.data.quota && data.data.use_quota) {
                                    $('.quota-container progress').attr('max', data.data.quota);
                                    $('.quota-container progress').val(data.data.use_quota);
                                    $('.quota-container span.quota').text(app.bytesToSize(data.data.quota));
                                    $('.quota-container span.use-quota').text(app.bytesToSize(data.data.use_quota));
                                }
                            } else {
                                mdui.alert(data.msg);
                            }
                        };
                    };
                    xhr.onerror = function (e) {
                        mdui.alert(data.msg);
                    }
                    xhr.send(fd);
                },
                function(){
                    // mdui.alert('取消');
                },
                {confirmText:'上传',cancelText:'取消'},
                );
                    
                }
            }
        }
    })
        /***************检测粘贴上传图片结束*******************/ 
        

    var clipboard = new ClipboardJS('.copy', {
        text: function (trigger) {
            return $(trigger).parent('li').text();
        }
    });

    clipboard.on('success', function (e) {
        app.msg(true, '复制成功');
    });

    clipboard.on('error', function (e) {
        app.msg(false, '复制失败');
    });

    $("#image").fileinput({
        uploadUrl: "https://image.kieng.cn/upload.html?type=ali",
        language: "zh",
        uploadAsync: true,
        overwriteInitial: false,
        
        maxFileSize: "5120",
        maxFileCount: "20",
        showCaption: true,
        dropZoneEnabled: true,
        browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i> ",
        allowedFileExtensions: JSON.parse('["jpg","jpeg","gif","png","ico"]'),
        uploadExtraData: {
            "_xsrf":"Sisfk2617hDxONTfYZ1HJCGR1r7dC5EH",
            "apiSelect": "Local"
        }
    }).on("fileuploaded", function (event, data, previewId, index) {
        var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
        if (200 === response.code) {
            app.msg(true,response.data.name+"上传完成");
            $("#code-url ul").prepend("<li>" + response.data.url + "<i class=\"copy iconfont icon-copy\"></i></li>");
            $("#code-html ul").prepend("<li>&lt;img src=\"" + response.data.url + "\" alt=\"" + response.data.name + "\" title=\"" + response.data.name + "\" /&gt;<i class=\"copy iconfont icon-copy\"></i></li>");
            $("#code-bbcode ul").prepend("<li>[img]" + response.data.url + "[/img]<i class=\"copy iconfont icon-copy\"></i></li>");
            $("#code-markdown ul").prepend("<li>![" + response.data.name + "](" + response.data.url + ")<i class=\"copy iconfont icon-copy\"></i></li>");
            $("#code-markdown-with-link ul").prepend("<li>[![" + response.data.name + "](" + response.data.url + ")](" + response.data.url + ")<i class=\"copy iconfont icon-copy\"></i></li>");
            $(".success-info").css("width", "inherit");
            if (response.data.quota && response.data.use_quota) {
                $('.quota-container progress').attr('max', response.data.quota);
                $('.quota-container progress').val(response.data.use_quota);
                $('.quota-container span.quota').text(app.bytesToSize(response.data.quota));
                $('.quota-container span.use-quota').text(app.bytesToSize(response.data.use_quota));
            }
        } else if (500 === response.code) {
            mdui.alert(response.msg, '发生异常');
        } else {
            mdui.alert(response.msg);
        }
    });
    $('#image').css("display", "block");