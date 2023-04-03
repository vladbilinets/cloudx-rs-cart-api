INSERT INTO users(id, name, email, password)
    VALUES ('61dddfa6-63e7-42f1-aab0-d3713b456cc8', 'user1', 'user1@email.com', '24c9e15e52afc47c225b757e7bee1f9d'), /* password : user1 */
    ('75b471f5-4545-4c89-9110-b9fcaf065d81', 'user2', 'user2@email.com', '7e58d63b60197ceb55a1c487989a3720'); /* password: user2 */

INSERT INTO carts(id, user_id, created_at, updated_at, status)
    VALUES ('86619b8c-66bd-4a1a-8150-a7dfdf7ca180', '61dddfa6-63e7-42f1-aab0-d3713b456cc8', '2023-01-01', '2023-01-01', 'OPEN'),
    ('04f06c58-91f4-4973-9892-fb9fac492304', '75b471f5-4545-4c89-9110-b9fcaf065d81', '2023-02-02', '2023-02-02', 'ORDERED');

INSERT INTO cart_items(cart_id, product_id, count)
    VALUES ('86619b8c-66bd-4a1a-8150-a7dfdf7ca180', '0d35faad-9e25-4acf-8bc7-43385817c53e', 1),
    ('86619b8c-66bd-4a1a-8150-a7dfdf7ca180', 'f176046b-120d-445f-b1c0-5882c3752d0a', 2),
    ('04f06c58-91f4-4973-9892-fb9fac492304', 'e20cb56e-ee7b-4502-b958-78965b9af871', 3);

INSERT INTO orders(id, user_id, cart_id, status, total)
    VALUES ('91fdb61b-9927-45d9-a99a-186e1ce129be', '75b471f5-4545-4c89-9110-b9fcaf065d81', '04f06c58-91f4-4973-9892-fb9fac492304', 'ORDERED', 123);
