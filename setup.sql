
-- GRANT INSERT, SELECT, UPDATE, DELETE ON acad.* TO acadeuser;
-- setup.sql

-- make sure the websiteuser account is set up and has the correct privileges
CREATE USER IF NOT EXISTS acaduser IDENTIFIED BY 'p455w0rd';
-- GRANT ALL PRIVILEGES ON acad.* TO 'acaduse'@'localhost' IDENTIFIED BY 'p455w0rd';
  -- GRANT SELECT, INSERT, UPDATE ON `acad`.* TO `acaduser`


-- SHOW GRANTS FOR 'acaduser'@'localhost';




DROP TABLE IF EXISTS accounts;

CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  pass VARCHAR(70) NOT NULL,
  user_first_name VARCHAR(255) NOT NULL,
  user_last_name VARCHAR(255) NOT NULL,
  user_country VARCHAR(255),
  user_city VARCHAR(255),
  user_telephone VARCHAR(35),
  subscribed BOOL,
  role VARCHAR(25) DEFAULT 'customer'
);

INSERT INTO accounts(user_email, pass, user_first_name, user_last_name, user_country, user_city, user_telephone, role)
	VALUES
        (
        "admin", 
        "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO", 
        "admin", 
        NULL, 
        NULL, 
        NULL, 
        NULL, 
        "admin"
        ),
        (
        "john.ibrahimovic@gmail.com",
        "$2a$10$cn1SBeTylMQNR6vWSSdAlO4pSv2r2ObOpZngqxSt9tWgYurMZnQia",
        "John", 
        "Ibrahimovic",
        "Mongolia", 
        "Darab", 
        "+40739012134",
        true,
        "customer"
        ),
        ( 
        "mark.jhonson@gmail.com",
        "$2a$10$i2ejgx8v2y.taWzQA0/C/O1e5wEPsFbTwgPIzlbU3z2pDv2iUjPGq", 
        "Mark",
        "Jhonson",
        "Germany",
        "Munich",
        "+40739213131",
        false,
        "customer"
        ),
        ( 
        "alexa.thompson@gmail.com",
        "$2a$10$X5T11GyRD5CeCg8YjYBvTO8U1bm.R8Dr.ocK21q/pJ91xqoUsJjuC",
        "Alexa",
        "Thompson",
        "France",
        "Paris",
        "+40734257853",
        true,
        "customer"
        ),
        ( 
        "margaret.spencer@yahoo.com",
        "$2a$10$i2ejgx8v2y.taWzQA0/C/O1e5wEPsFbTwgPIzlbU3z2pDv2iUjPGq", 
        "Margaret",
        "Spencer",
        "Romania",
        "Bucharest",
        "+40732134443",
        true,
        "customer"
        );












DROP TABLE IF EXISTS orders;

-- Not the best or prettiest but it does the job
CREATE TABLE IF NOT EXISTS orders (
    id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    user_full_name VARCHAR(255),
    currency VARCHAR(25),
    type_service VARCHAR(255),
    type_paper VARCHAR(255),
    number_of_pages INT(25),
    academic_level VARCHAR(255),
    title VARCHAR(300),
    description VARCHAR(3000),
    urgency INT(25),
    paid VARCHAR(25) DEFAULT 'no',
    status VARCHAR(45) DEFAULT 'To be accepted', 
    date_time_created DATETIME,
    date_time_accepted DATETIME,
    date_time_delivered DATETIME,
    uuid VARCHAR(255) NOT NULL
);


	INSERT INTO orders (user_email, user_full_name, currency, type_service, type_paper, number_of_pages, academic_level, title, description, urgency, paid, date_time_created, uuid ) VALUES ( 
        "john.ibrahimovic@gmail.com",     
        "John Ibrahimovic",              
        "eur",                           
        "Academic Writing Paper",        
        "Essay",                         
        22,                                
        "Master's",
        "Examining the Relationship between Income Inequality and Health Outcomes",
        "Examining the Relationship between Income Inequality and Health Outcomes is a research paper that explores the relationship between income inequality and health outcomes. The paper analyzes data from various sources, including academic articles and government reports, to examine the impact of income inequality on various health outcomes such as mortality, morbidity, and mental health.

The paper begins by providing a brief overview of income inequality and its effects on society. It then delves into the impact of income inequality on health outcomes, citing various studies that have explored the relationship between income inequality and specific health outcomes such as heart disease, mental illness, and life expectancy.

In addition to analyzing the existing research on income inequality and health outcomes, the paper also examines potential mechanisms that may explain this relationship. The paper explores factors such as access to healthcare, social support, and stress as potential mediating factors that may help to explain why income inequality is linked to poorer health outcomes.

Finally, the paper discusses potential policy interventions that could help to reduce income inequality and improve health outcomes. It examines various policy options such as progressive taxation, universal healthcare, and affordable housing as potential ways to reduce income inequality and improve health outcomes.

Overall, Examining the Relationship between Income Inequality and Health Outcomes is a comprehensive analysis of the impact of income inequality on health outcomes. The paper provides a nuanced understanding of the complex relationship between these two factors and highlights potential avenues for policy intervention.",                     
        13,                              
        "yes",                             
        "2023-01-19 03:14:07",             
        UUID()                            
  ) ;                                
  





    INSERT INTO orders (	
          user_email,                      
          user_full_name,
          currency,                        
				type_service,                    
				type_paper,                      
				number_of_pages,         	       
				academic_level,         	       
				urgency,        				           
				date_time_created,        
          uuid                  
                
    ) VALUES ( 
          "mark.jhonson@gmail.com",     
          "Mark Jhonson",
           "eur",                           
        "Academic Writing Paper",        
        "Essay",                         
        22,                                
        "Master's",                      
        13,                                
        "2023-01-19 03:14:07",    
          UUID()         
  ) ,
  ( 
          "mark.jhonson@gmail.com",     
          "Mark Jhonson",
           "eur",                           
        "Academic Writing Paper",        
        "Essay",                         
        22,                                
        "Master's",                      
        13,                              
        "yes",                             
        "2023-01-19 03:14:07",    
          UUID()         
  )                                   
  

    INSERT INTO orders (	
          user_email,                      
          user_full_name,
          currency,                        
				type_service,                    
				type_paper,                      
				number_of_pages,         	       
				academic_level,         	       
				urgency,         				         
				paid,         				           
				date_time_created,        
          uuid                  
                
    ) VALUES ( 
          "margaret.spencer@yahoo.com",     
          "Margaret Spence",
           "eur",                           
        "Academic Writing Paper",        
        "Essay",                         
        22,                                
        "Master's",                      
        13,                              
        "yes",                             
        "2023-01-19 03:14:07",    
          UUID()         
  )             










-- -- For testing
-- INSERT INTO parcels(
--                     sender_address, 
--                     sender_city, 
--                     sender_postcode, 
--                     sender_country, 
--                     recipient_address, 
--                     recipient_city, 
--                     recipient_postcode, 
--                     recipient_country, 
--                     weight_kg, 
--                     sender_username, 
--                     recipient_name, 
--                     courier_name,
--                     date_time_created, 
--                     date_time_in_transit, 
--                     date_time_delivered, 
--                     status, 
--                     uuid
--                   )    
--           VALUES( "68 S Audley St", 
--                   "London", 
--                   "W1K 2QY",  
--                   "United Kingdom", 
--                   "534 Fulham Palace Rd", 
--                   "London", 
--                   "SW6 6JH", 
--                   "United Kingdom",
--                   "10", 
--                   "customer1", 
--                   "John Doe", 
--                   null, 
--                   "2022-06-06 00:51:51", 
--                   null, 
--                   null, 
--                   "not-dispatched", 
--                   UUID()
--                 ),
--                 ( "4 Water St", 
--                   "Liverpool", 
--                   "L2 3SP",  
--                   "United Kingdom", 
--                   "8-14 Talbot Square, Tyburnia", 
--                   "London", "W2 1TS", 
--                   "United Kingdom",
--                   "20", 
--                   "customer1", 
--                   "Mark Spencer", 
--                   null, 
--                   "2022-06-06 00:51:51", 
--                   null, 
--                   null, 
--                   "not-dispatched", 
--                   UUID()
--                 ),        
--                 ( "Derrys Cross", 
--                   "Plymouth", 
--                   "PL1 2SN",  
--                   "United Kingdom", 
--                   "Station Rise", 
--                   "York", 
--                   "YO1 6GD", 
--                   "United Kingdom",
--                   "10", 
--                   "customer1", 
--                   "John Doe", 
--                   null, 
--                   "2022-06-06 00:51:51", 
--                   null, 
--                   null, 
--                   "not-dispatched", 
--                   UUID()
--                 ),
--                 ( "Brook St", 
--                   "Cromer", 
--                   "NR27 9HD",  
--                   "United Kingdom", 
--                   "6 Northcote Rd", 
--                   "London", 
--                   "SW11 1NT", 
--                   "United Kingdom",
--                   "10", 
--                   "customer1", 
--                   "John Doe", 
--                   null,
--                   "2022-06-06 00:51:51", 
--                   null, 
--                   null, 
--                   "not-dispatched", 
--                   UUID()
--                 ),
--                 ( "128 High St", 
--                   "Slough", 
--                   "SL1 1JF",  
--                   "United Kingdom", 
--                   "442-444 Roman Rd", 
--                   "Bow, London", 
--                   "E3 5LU", 
--                   "United Kingdom",
--                   "10", 
--                   "customer1", 
--                   "John Doe", 
--                   "courier1", 
--                   "2022-06-06 00:51:51", 
--                   "2022-06-06 00:51:51", 
--                   null,
--                   "in-transit", 
--                   UUID()
--                 );
        


