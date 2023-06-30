import psycopg2

connection = None
cursor = None

try:
    # Establish a connection to the database
    connection = psycopg2.connect(
        host="newyorkbusy.cmbwzu1bhkey.us-east-1.rds.amazonaws.com",  
        dbname="newyorkbusy", 
        user="db4comp47360",
        password="researchpracticum",  
        port="5432"  
    )

    cursor = connection.cursor()

    # Define the CREATE TABLE statements
    create_users_table = """
    CREATE TABLE Users (
        UserID SERIAL PRIMARY KEY,
        Username VARCHAR(255) UNIQUE NOT NULL,
        Password VARCHAR(255) NOT NULL,
        Email VARCHAR(255) UNIQUE NOT NULL,
        Category1 VARCHAR(255) NOT NULL,
        Category2 VARCHAR(255) NOT NULL,
        Category3 VARCHAR(255) NOT NULL
    );
    """

    create_pois_table = """
    CREATE TABLE POIs (
        POIID SERIAL PRIMARY KEY,
        POIName VARCHAR(255) NOT NULL,
        Description TEXT,
        Latitude FLOAT NOT NULL,
        Longitude FLOAT NOT NULL,
        OpenningHours FLOAT NOT NULL,
        Category VARCHAR(255) NOT NULL
    
    );
    """



    create_userbucketlist_table = """
    CREATE TABLE UserBucketlist (
        BucketlistID SERIAL PRIMARY KEY,
        UserID INT REFERENCES Users(UserID),
        POIID INT REFERENCES POIs(POIID),
        StartDate DATE,
        EndDate DATE
        
    );
    """



    # Execute the CREATE TABLE statements
    cursor.execute(create_users_table)
    cursor.execute(create_pois_table)
    cursor.execute(create_userbucketlist_table)

    # Commit the transaction
    connection.commit()

    print("Tables created successfully")

except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)

finally:
    # Close the database connection
    if cursor:
        cursor.close()
    if connection:
        connection.close()
    print("PostgreSQL connection is closed")
