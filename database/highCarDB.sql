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