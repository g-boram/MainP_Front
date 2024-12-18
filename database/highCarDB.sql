create database highCar;
use highCar;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    address TEXT,
    role ENUM('USER', 'SELLER', 'ADMIN') DEFAULT 'USER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

select * from Users;

-- ##### 자동차 테이블 #####
CREATE TABLE Cars (
    car_id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    mileage INT NOT NULL,
    fuel_type ENUM('Gasoline', 'Diesel', 'Electric', 'Hybrid') NOT NULL,
    transmission ENUM('Automatic', 'Manual') NOT NULL,
    color VARCHAR(30),
    status ENUM('Available', 'Sold') DEFAULT 'Available',
    description TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- 자동차 1
INSERT INTO Cars (seller_id, make, model, year, price, mileage, fuel_type, transmission, color, status, description, image_url)
VALUES 
(2, 'Toyota', 'Corolla', 2020, 20000.00, 15000, 'Gasoline', 'Automatic', 'Blue', 'Available', '2020 Toyota Corolla with low mileage.', 'https://example.com/images/corolla.jpg');

-- 자동차 2
INSERT INTO Cars (seller_id, make, model, year, price, mileage, fuel_type, transmission, color, status, description, image_url)
VALUES 
(2, 'Honda', 'Civic', 2018, 18000.00, 30000, 'Gasoline', 'Manual', 'Red', 'Available', '2018 Honda Civic with excellent condition and manual transmission.', 'https://example.com/images/civic.jpg');

-- 자동차 3
INSERT INTO Cars (seller_id, make, model, year, price, mileage, fuel_type, transmission, color, status, description, image_url)
VALUES 
(2, 'Tesla', 'Model 3', 2022, 45000.00, 8000, 'Electric', 'Automatic', 'Black', 'Available', '2022 Tesla Model 3 with electric powertrain and advanced features.', 'https://example.com/images/model3.jpg');

-- 자동차 4
INSERT INTO Cars (seller_id, make, model, year, price, mileage, fuel_type, transmission, color, status, description, image_url)
VALUES 
(2, 'BMW', 'X5', 2021, 60000.00, 12000, 'Diesel', 'Automatic', 'White', 'Sold', '2021 BMW X5 in pristine condition, great for long drives.', 'https://example.com/images/x5.jpg');

-- 자동차 5
INSERT INTO Cars (seller_id, make, model, year, price, mileage, fuel_type, transmission, color, status, description, image_url)
VALUES 
(2, 'Ford', 'Mustang', 2019, 35000.00, 22000, 'Gasoline', 'Automatic', 'Yellow', 'Available', '2019 Ford Mustang with powerful engine and sporty features.', 'https://example.com/images/mustang.jpg');

select * from Cars;



CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NOT NULL,
    user_id INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES Cars(car_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NOT NULL,
    buyer_id INT NOT NULL,
    seller_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Completed', 'Cancelled') DEFAULT 'Completed',
    FOREIGN KEY (car_id) REFERENCES Cars(car_id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- ##### 게시글 테이블 #####
-- ## 업데이트(수정) 여부, 삭제시간, 삭제여부 추가하기 
CREATE TABLE Board (
    board_id INT AUTO_INCREMENT PRIMARY KEY,           -- 게시글 고유 ID
    user_id INT NOT NULL,                              -- 작성자 ID (Users 테이블과 연관)
    title VARCHAR(255) NOT NULL,                       -- 게시글 제목
    content TEXT NOT NULL,                             -- 게시글 내용
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,     -- 게시글 작성일시
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 게시글 수정일시
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE', -- 게시글 상태 (활성/비활성)
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE -- 작성자 (Users 테이블과 연관)
);


INSERT INTO Board (title, content, user_id, created_at, updated_at) VALUES 
('Welcome to the Board', 'This is the first post on this board.', 4, NOW(), NOW()),
('Upcoming Features', 'We are working on some exciting features. Stay tuned!', 4, NOW(), NOW()),
('Community Guidelines', 'Please adhere to the guidelines while participating in discussions.', 4, NOW(), NOW()),
('Maintenance Notice', 'The system will be down for maintenance on Saturday at 2 AM.', 4, NOW(), NOW()),
('Feature Request', 'Can we have a dark mode option in the next update?', 4, NOW(), NOW());

select * from Board;



CREATE TABLE Favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    car_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES Cars(car_id) ON DELETE CASCADE
);

CREATE TABLE Messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    car_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES Cars(car_id) ON DELETE CASCADE
);

CREATE TABLE Admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    department VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


-- 사용자 1 (일반 사용자)
INSERT INTO Users (username, email, password, phone_number, address, role) 
VALUES 
('user1', 'user1@example.com', 'user1', '123-456-7890', '123 Main St, Anytown, USA', 'USER');

-- 사용자 2 (판매자)
INSERT INTO Users (username, email, password, phone_number, address, role) 
VALUES 
('seller1', 'seller1@example.com', 'seller1', '987-654-3210', '456 Oak St, Anytown, USA', 'SELLER');

-- 사용자 3 (관리자)
INSERT INTO Users (username, email, password, phone_number, address, role) 
VALUES 
('admin1', 'admin1@example.com', 'admin1', '555-555-5555', '789 Pine St, Anytown, USA', 'ADMIN');

select * from Users;




-- 전체 테이블 목록 보기
SHOW TABLES;

--  테이블 구조 보기
-- DESCRIBE [table_name];

-- [주요 사항]

-- 1.Admins 테이블
-- Admins 테이블은 Users 테이블과 user_id로 연결됩니다. 이를 통해 관리자 정보와 일반 사용자 정보를 관리할 수 있습니다.
-- department와 position은 부서와 직책을 나타냅니다.

-- 2.외래키(FK)
-- 모든 외래키는 CASCADE 삭제를 적용하여 참조된 데이터 삭제 시 관련 데이터도 삭제됩니다.

-- 3.Role 관리
-- Users 테이블의 role 컬럼을 통해 권한(USER, SELLER, ADMIN)을 관리합니다.

-- 4.기타 인덱스
-- 필요하면 검색 속도를 높이기 위해 추가적인 인덱스를 설정할 수 있습니다.
