async function LoadData() {
    let res = await fetch("http://localhost:3000/posts");
    let posts = await res.json();
    let body = document.getElementById("body_table");
    body.innerHTML = '';
    for (const post of posts) {
        let titleDisplay = post.isDeleted ? `<s>${post.title}</s>` : post.title;
        body.innerHTML += `<tr>
            <td>${post.id}</td>
            <td>${titleDisplay}</td>
            <td>${post.views}</td>
            <td><input type="submit" value="Delete" onclick="Delete(${post.id})"/></td>
        </tr>`;
    }

}
async function Save() {
    let id = document.getElementById("id_txt").value;
    let title = document.getElementById("title_txt").value;
    let views = document.getElementById("view_txt").value;

    let postsRes = await fetch("http://localhost:3000/posts");
    let posts = await postsRes.json();
    let maxId = posts.reduce((max, post) => Math.max(max, parseInt(post.id)), 0);

    if (!id) {
        id = (maxId + 1).toString();
    }

    let getItem = await fetch('http://localhost:3000/posts/' + id);
    if (getItem.ok) {
        let res = await fetch('http://localhost:3000/posts/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                views: views
            })
        });
        if (res.ok) {
            console.log("Cập nhật thành công");
        }
    } else {
        try {
            let res = await fetch('http://localhost:3000/posts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    views: views
                })
            });
            if (res.ok) {
                console.log("Thêm mới thành công");
            }
        } catch (error) {
            console.log(error);
        }
    }
    LoadData();
    return false;



}
async function Delete(id) {
    let res = await fetch("http://localhost:3000/posts/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isDeleted: true
        })
    });
    if (res.ok) {
        console.log("Xóa mềm thành công");
    }
    LoadData();
    return false;
}
async function LoadComments() {
    let res = await fetch("http://localhost:3000/comments");
    let comments = await res.json();
    let body = document.getElementById("comments_table");
    body.innerHTML = '';
    for (const comment of comments) {
        body.innerHTML += `<tr>
            <td>${comment.id}</td>
            <td>${comment.content}</td>
            <td>${comment.postId}</td>
            <td><input type="submit" value="Sửa" onclick="EditComment(${comment.id}, '${comment.content}', ${comment.postId})"/> <input type="submit" value="Xóa" onclick="DeleteComment(${comment.id})"/></td>
        </tr>`;
    }
}

async function EditComment(id, content, postId) {
    document.getElementById("comment_id_txt").value = id;
    document.getElementById("comment_content_txt").value = content;
    document.getElementById("comment_postId_txt").value = postId;
}

async function SaveComment() {
    let id = document.getElementById("comment_id_txt").value;
    let content = document.getElementById("comment_content_txt").value;
    let postId = document.getElementById("comment_postId_txt").value;

    let commentsRes = await fetch("http://localhost:3000/comments");
    let comments = await commentsRes.json();
    let maxId = comments.reduce((max, comment) => Math.max(max, parseInt(comment.id)), 0);

    if (!id) {
        id = (maxId + 1).toString();
    }

    let getItem = await fetch('http://localhost:3000/comments/' + id);
    if (getItem.ok) {
        let res = await fetch('http://localhost:3000/comments/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: content,
                postId: postId
            })
        });
        if (res.ok) {
            console.log("Cập nhật bình luận thành công");
        }
    } else {
        try {
            let res = await fetch('http://localhost:3000/comments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    content: content,
                    postId: postId
                })
            });
            if (res.ok) {
                console.log("Thêm bình luận thành công");
            }
        } catch (error) {
            console.log(error);
        }
    }
    LoadComments();
    return false;
}

async function DeleteComment(id) {
    let res = await fetch("http://localhost:3000/comments/" + id, {
        method: "DELETE"
    });
    if (res.ok) {
        console.log("Xóa bình luận thành công");
    }
    LoadComments();
    return false;
}

LoadData();
LoadComments();