Code Hello-Meeyland

- Khởi động server:
    + Đường dẫn: cd backend
    + db mongo: mongodb+srv://test:tbyaGB9kbb48tdGV@cluster0.bwlyx.mongodb.net/task1
    + Chạy: npm install
            npm run start

    API tạo mới: 
        uri: http://localhost:5000/meeyland/v1.0/request 
        giao thức: post
        res.body : {
                    "data_request": {
                        "senderName": "Truong",
                        "senderEmail": "truong@gamil.com.com",
                        "senderPhone": "0955555555",
                        "code": "10055",
                        "note": "Gọi điện hoặc nHắn tin cho tôi",
                        "supportCount": 2,
                        "type": 2,
                        "viewAt": "2021-08-12T15:16:09.000Z",
                        "status": 1,
                    },
                    "data_news": {
                        "title": "Mua chung cư Time",
                        "content": "Thanh Xuân- Hà Nội",
                        "code": "100001",
                        "slug": "mua-chung-cu-time",
                        "category": "61143c6240d2103d60945152"
                    },
                    "data_users": {
                        "name": "Nguyet",
                        "email": "nguyet@gmail.com",
                        "phone": "0982896677"
                    }
                }

    API cập nhật: 
    uri: http://localhost:5000/meeyland/v1.0/request 
    giao thức: put
    res.body : {
                "data_request": {
                    "senderName": "Phuong",
                    "senderEmail": "phuong@gamil.com.com",
                    "senderPhone": "0933333335",
                    "code": "10015",
                    "note": "Gọi điện hoặc nHắn tin cho tôi",
                    "supportCount": 2,
                    "type": 1,
                    "viewAt": "2021-08-12T15:16:09.000Z",
                    "status": 1,
                    "_id": "6114ec2aa37b0227f0d9ff43"
                },
                "data_news": {
                    "title": "Ban chung cư royal",
                    "content": "Thanh Xuân- Hà Nội",
                    "code": "1001",
                    "slug": "ban-chung-cu-royal",
                    "category": "61143c6240d2103d60945152"
                },
                "data_users": {
                    "name": "Tuan",
                    "email": "tuan@gmail.com",
                    "phone": "0982896453"
                }
            }


- Khởi động front-end:
    + Đường dẫn: cd front-end
    + Chạy: npm install
            npm run start

    + Đường dẫn: http://localhost:8005/sample
