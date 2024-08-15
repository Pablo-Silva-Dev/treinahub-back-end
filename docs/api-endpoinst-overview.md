# API endpoints overview

| Route Path                                          | Method | Request Body example                                                                                                          | Route Objective                                | Access Level |
|-----------------------------------------------------|--------|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|--------------|
| /recovery-code/validate                             | POST   | `{ "user_id" : "user-id", "code": "266336" }`                                                                          | Validate a recovery code                       | -            |
| /users/auth                                         | POST   | `{ "email": "pablolucioadmin_@hotmail.com", "password": "Abcde123@" }`                                                 | Authenticate a user                            | -            |
| /users/list                                         | GET    | N/A                                                                                                                    | List all users                                 | admin        |
| /users/get-by-id/`user-id`                          | GET    | N/A                                                                                                                    | Get user details by ID                         | user         |
| /users/delete/`user-id`                             | DELETE | N/A                                                                                                                    | Delete a user by ID                            | user         |
| /user/update                                        | PUT    | `{ "id": "user-id", "password": "Abcde123@", "cep": "35930-544", "street": "Rua da esperança", "district": "Jardim nobre", "city": "Aloa", "uf": "MG", "residence_number": "103", "phone": "+5511999998888" }` | Update user information                        | user         |
| /users/get-by-email/`user-email`                    | GET    | N/A                                                                                                                    | Get user details by email                      | user         |
| /users/get-by-cpf/`user-cpf`                        | GET    | N/A                                                                                                                    | Get user details by CPF                        | user         |
| /users/create                                       | POST   | `{ "name": "Pablo Teste", "cpf": "123.456.789-45", "email": "pablolucioadmin_@hotmail.com", "phone": "+5531985187922", "birth_date": "1995-11-05", "password": "Abcde123@", "is_admin": true, "token": "token" }` | Create a new user                              | -            |
| /users/get-recovery-password-code-by-email          | POST   | `{ "cpf": "user-cpf", "email": "user-email" }`                                                                         | Get recovery password code by email            | -            |
| /users/get-recovery-password-code-by-phone          | POST   | `{ "phone": "+5531985187963" }`                                                                                        | Get recovery password code by phone SMS           | -            |
| /trainings/list                                     | GET    | N/A                                                                                                                    | List all trainings                             | user         |
| /trainings/get-by-id/`training-id`                  | GET    | N/A                                                                                                                    | Get training details by ID                     | user         |
| /trainings/delete/`training-id`                     | DELETE | N/A                                                                                                                    | Delete a training by ID                        | admin        |
| /trainings/update                                   | PUT    | `{ "id": "training-id", "name": "Treinamento de Software de Laço4", "descrdiption": "Aprenda a manusear o software de treinamento de laços4" }` | Update training details                        | admin        |
| /trainings/create                                   | POST   | `{ "name": "Treinamento de Software de Gestão Publica", "description": "Aprenda a manusear o software de treinamento de Gestão Publica", "duration": 0 }` | Create a new training                          | admin        |
| /training-metrics/list                              | GET    | N/A                                                                                                                    | List all training metrics                      | admin         |
| /training-metrics/list-by-user/`user-id`            | GET    | N/A                                                                                                                    | List training metrics by user ID               | user         |
| /training-metrics/get-by-id/`training-metrics-id`   | GET    | N/A                                                                                                                    | Get training metrics details by ID             | user         |
| /training-metrics/update                            | PUT    | `{ "id": "training-metrics-id", "user_id": "user-id", "training_id": "training-id" }`                                  | Update training metrics                        | user         |
| /training-metrics/create                            | POST   | `{ "user_id": "user-id", "training_id": "training-id" }`                                                               | Create new training metrics                    | user         |
| /faq-questions/list                                 | GET    | N/A                                                                                                                    | List all FAQ questions                         | user         |
| /faq-questions/get-by-id/`faq-question-id`          | GET    | N/A                                                                                                                    | Get FAQ question details by ID                 | user         |
| /faq-questions/delete/`faq-question-id`             | DELETE | N/A                                                                                                                    | Delete a FAQ question by ID                    | admin        |
| /faq-questions/update                               | PUT    | `{ "id": "faq-question-id", "question": "Como faço para acessar as video aulas no celular?", "answer": "Para acessar as video aulas, primeiro você precisa se cadastrar e se autenticar na plataforma. Uma vez autenticado, basta iniciar seu treinamento e as video aulas estarão disponíveis." }` | Update FAQ question details                    | admin        |
| /faq-questions/create                               | POST   | `{ "question": "Como faço para acessar as video aulas?", "answer": "Para acessar as video aulas, primeiro você precisa se cadastrar e se autenticar na plataforma. Uma vez autenticado, basta iniciar seu treinamento e as video aulas estarão disponíveis." }` | Create a new FAQ question                      | admin        |
| /video-classes/list                                 | GET    | N/A                                                                                                                    | List all video classes                         | user         |
| /video-classes/list-by-training/`training-id`       | GET    | N/A                                                                                                                    | List video classes by training ID              | user         |
| /video-classes/get-by-id/`video-class-id`           | GET    | N/A                                                                                                                    | Get video class details by ID                  | user         |
| /video-classes/delete/`video-class-id`              | DELETE | N/A                                                                                                                    | Delete a video class by ID                     | admin        |
| /video-classes/update                               | PUT    | `{ "id": "video-class-id", "name": "Registrando novos usuários", "description": "Aprenda como registrar novos usuários no sistema", "duration": 120, "url": "https://www.inovex.de/wp-content/uploads/345/03/react-native.png", "thumbnail_url": "https://www.inovex.de/wp-content/uploads/345/03/react-native.png", "training_id": "training-id" }` | Update video class details                     | admin        |
| /video-classes/create                               | POST   | `{ "name": "Registrando novos usuários pt2", "description": "Aprenda como registrar novos usuários no sistema", "duration": 120, "url": "https://www.inovex.de/wp-content/uploads/20188/03/react-native.png", "thumbnail_url": "https://www.inovex.de/wp-content/uploads/201238/03/react-native.png", "training_id": "training-id" }` | Create a new video class                       | admin        |
| /watched-classes/list                               | GET    | N/A                                                                                                                    | List all watched classes                       | admin         |
| /watched-classes/list-by-user-and-training          | POST   | `{ "user_id": "user-id", "training_id": "training-id" }`                                                               | Get watched classes by user and training       | user         |
| /watched-classes/add                             | POST   | `{ "videoclass_id": "video-class-id", "user_id": "user-id", "training_id": "training-id" }`                            | Adds a new watched class                     | user         |
| /watched-classes/remove                             | POST   | `{ "videoclass_id": "video-class-id", "user_id": "user-id" }`                            | Removes a watched class from the watched classes list                     | user         |
| /logs/list                                          | GET    | N/A                                                                                                                    | List all logs                                  | admin        |
| /logs/create                                        | POST   | `{ "user_id": "user-id" }`                                                                                             | Create a new log                               | user         |
| /avatars/get-by-user-id/`user-id`                   | GET    | N/A                                                                                                                    | Get avatar details by user ID                  | user         |
| /avatars/update                                     | PUT    | `{ "id": "avatar-id", "url": "https://www.inovex.de/wp-content/uploads/2018/03/react-native.png" }`                    | Update avatar details                          | user         |
| /avatars/create                                     | POST   | `{ "user_id": "user-id", "url": "https://www.inovex.de/wp-content/uploads/2018/03/react-native.png" }`                 | Create a new avatar                            | user         |
| /contacts-support/list                                          | GET    | N/A                                                                                                                    | List all contacts-support                                  | user        |
| /contacts-support/update                            | PUT    | `{ "id": "contact-id", "contact_number": "+5511999998888" }`                                                        | Update contact support details                 | admin        |
| /contacts-support/create                            | POST   | `{ "contact_number": "+5511999998888" }`                                                                            | Create a new contact support                   | admin        |
| /certificates/get-by-id/`certificate-id`            | GET    | N/A                                                                                                                    | Get certificate details by ID                  | user         |
| /certificates/list                                  | GET    | N/A                                                                                                                    | List all certificates                          | admin         |
| /certificates/list-by-user/`user-id`                | GET    | N/A                                                                                                                    | List certificates by user ID                   | user         |
| /certificates/create                                | POST   | `{ "user_id": "user-id", "training_id": "training-id", "url": "https://www.inovex.de/wp-content/uploads/201328/03/react-native.png" }` | Create a new certificate                       | user         |