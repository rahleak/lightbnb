INSERT INTO users (name, email, password)
VALUES ('Rahwa Leakemariam', 'rl@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u' ), 
('Tenisha Stewart', 'ts@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'), 
('Akeem Roberts', 'ar@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Hot Spot', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 200, 2, 3, 4, 'Canada', '123 Fake Street', 'Mississauga', 'Ontario', '90909', TRUE), 
(2, 'Sun House', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 300, 1, 2, 2, 'Canada', '456 Lucky Lane', 'Brampton', 'Ontario', '12321', TRUE), 
(3, 'Four Corners', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 250, 2, 2, 3, 'Canda', '777 Gaza Junction', 'Scarborough', 'Ontario', '41414', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2019-03-17', '2019-03-22', 2, 3),
('2019-07-20', '2019-07-25', 1, 2),
('2019-05-02', '2019-05-10', 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 1, 2, 5, 'messages'), 
(3, 2, 1, 4, 'messages'),
(1, 3, 3, 5, 'messages');