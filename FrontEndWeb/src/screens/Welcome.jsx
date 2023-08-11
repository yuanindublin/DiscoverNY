import React from "react";
import { Accordion, Container, Row, Col } from "react-bootstrap";

function Welcome() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>About us</Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  Are you looking to explore Manhattan without having to deal
                  with huge crowds? Our website is perfect for you ! <br />
                  <br />
                  With over 200 points of interest, you are sure to find
                  something that peaks your interests. Our dynamic busy
                  predictions will allow you identify the best time to visit
                  each point. If you would like to explore a specific area of
                  New York City, our interactive heap map is perfect for you !
                  <br />
                  <br /> For a more personalised experience, be sure to create
                  an account and add your desired interests to your bucket list.
                </p>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  Data Team: <br />
                  <p style={{ textIndent: "1em" }}>
                    Data Lead: Junwei Peng 💌 junwei.peng@ucdconnect.ie
                  </p>
                  <p style={{ textIndent: "1em" }}>
                    Coordination Lead: Iwinosa Imasuen 💌 iwinosa8773@gmail.com
                  </p>
                  <br />
                  Front End Team: <br />
                  <p style={{ textIndent: "1em" }}>
                    Front-End Code Lead: Yingyuan Li 💌
                    yingyuan.li@ucdconnect.ie
                  </p>
                  <p style={{ textIndent: "1em" }}>
                    Customer Lead: Peter Gaffiney 💌 Peter.gaffney@ucdconnect.ie
                  </p>
                  <br />
                  Back End Team:
                  <br />
                  <p style={{ textIndent: "1em" }}>
                    Back-End Code: Ruiqi Zhao 💌 ruiqi.zhao2@ucdconnect.ie
                  </p>
                  <p style={{ textIndent: "1em" }}>
                    Maintenance Lead: Zhaozhong Niu 💌 niuzhaozhong@gmail.com
                  </p>
                </p>
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Web App Direction</Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              {" "}
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="./assets/intro/web/sign.png"
                  alt="welcome"
                  height="550px"
                  width="550px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  To get started, simply enter your email and password to access
                  our remarkable applications.
                  <br />
                  <br />
                  But wait, there's more! If you're new here, you can take a
                  detour by clicking the "Register" link. Fill in your desired
                  username, email, and password and hit that "Register" button.
                  <br />
                  <br />
                  Whether you're seeking to uncover hidden gems in Manhattan,
                  make informed choices about your adventures, or curate a
                  personalized experience, our project has it all.
                  <br />
                  <br />
                  Your next adventure starts here.
                </p>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  Welcome to the Home Page - Your Gateway to Exploration!
                  <br />
                  <br />
                  Categories:
                  <br /> Immerse yourself in a variety of categories. As you
                  scroll down, you'll dive deeper into a chosen category.
                  <br />
                  <br />
                  Itinerary Planning:
                  <br />
                  On the right of each POI card, there's a minus sign. A simple
                  click adds the destination to your Itinerary List.
                  <br />
                  <br />
                  Bucket List:
                  <br />
                  The heart-shaped button on the left of each POI card lets you
                  add places to your Bucket List. Remember, to use this feature,
                  log in to our website and have your own collection of dream
                  destinations!
                  <br />
                  <br />
                  POI Details: <br />
                  Simply click on its image to access a detailed page. From
                  descriptions to images, everything is at your fingertips.
                </p>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <img
                  src="./assets/intro/web/home.png"
                  alt="welcome"
                  height="360px"
                  width="550px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="./assets/intro/web/discover.png"
                  alt="welcome"
                  height="360px"
                  width="550px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  Here, we give you the reins to customize your exploration:
                  <br />
                  <br />
                  Location:Our horizons will have expanded beyond Manhattan, New
                  York.
                  <br />
                  Interest: We will broaden our spectrum to include events,
                  hotels, restaurants, and more.
                  <br />
                  Category:
                  attraction,museum,shopping,entertainment,library,theatre,park,zoo.
                  <br />
                  <br />
                  POI Details: <br />
                  Simply click on specific poi block to access a detailed page.
                  From descriptions to images, everything is at your fingertips.
                  <br />
                  <br />
                  Find what resonates with you and add depth to your journey.
                </p>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <p>
                  Welcome to the Map Page!
                  <br />
                  <br />
                  Forecast Time: Choose the time you wish to explore.
                  <br />
                  <br />
                  Category Selection: Navigate through your interests
                  effortlessly.
                  <br />
                  <br />
                  Interactive Map Layer: Toggle between taxi zones and POI
                  markers to understand the pulse of the city.Hover over taxi
                  zones to reveal a treasure trove of insights. Our pop-ups
                  showcase the predicted busyness level and index, giving you a
                  real-time understanding of the area.
                  <br />
                  <br />
                  POI Card Insights: On the left side, our POI cards provide a
                  snapshot of predicted busyness levels during your selected
                  forecast time. This ensures you make informed decisions about
                  where to go next. Explore Button:
                  <br />
                  <br />
                  Button: When you're ready to dive into the specifics, hit the
                  "heart shape","minus sign","Go Detail" button.
                </p>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="./assets/intro/web/map.png"
                  alt="welcome"
                  height="360px"
                  width="550px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="./assets/intro/web/itinerary.png"
                  alt="welcome"
                  height="360px"
                  width="550px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  Welcome to our Itinerary Page!
                  <br />
                  <br />
                  Forecast Time: <br />
                  Choose the time you wish to explore.
                  <br />
                  <br />
                  Predicted Busyness Level: <br />
                  our POI cards provide a snapshot of predicted busyness levels
                  during your selected forecast time. This ensures you make
                  informed decisions about where to go next.
                  <br />
                  <br />
                  Organized route: <br />
                  Our smart algorithm reorders the list to ensure you get the
                  best experience possible. The POIs are categorized into
                  different levels of busyness, from "Not Busy" to "Very Busy."
                  Within each level, we prioritize by the busy index, ensuring
                  you make the most out of your visit.
                </p>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <p>
                  Welcome to our Bucket List Page!
                  <br />
                  <br />
                  Here, we bring your preferences to life. To unlock this
                  exciting feature, simply log in to your account.
                  <br />
                  <br />
                  Once you're in, you can curate your own collection of dream
                  destinations. It's your personal space to save and revisit the
                  places you're most excited about. And don't worry – we'll
                  securely store your preferences in our database, so you can
                  access them anytime, anywhere.
                </p>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="./assets/intro/web/bucket.png"
                  alt="welcome"
                  height="420px"
                  width="550px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="./assets/intro/web/detail.png"
                  alt="welcome"
                  height="360px"
                  width="550px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  Welcome to the Detail Page!
                  <br />
                  <br />
                  POIs information: <br />
                  Dive into the heart of the POI with a detailed
                  introduction.Toggle between images to immerse yourself in its
                  charm.
                  <br />
                  <br />
                  Add Button: <br /> Just hit that "Add" button. You can include
                  it in your itinerary, ensuring you don't miss out on any of
                  your chosen experiences. Plus, if you're logged in, you can
                  also add it to your bucket list, making it a part of your
                  travel aspirations.
                </p>
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Mobile App Direction</Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="./assets/intro/mobile/qrcode.jpeg"
                  alt="welcome"
                  height="200px"
                  width="200px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  We built our mobile app using expo with react native.
                  <br />
                  <br />
                  This QR code can be scanned by iPhone Camera app which will
                  open Expo app. On Android the Expo QR scanner can scan and
                  download.
                </p>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  This is the gateway to an exciting journey of exploration and
                  discovery.
                  <br />
                  <br />
                  With just a click of the "Go" button, you will step into the
                  immersive world of our applications.
                  <br />
                  <br />
                  So, why wait? Click that "Go" button and open the door to a
                  world of possibilities! Your next adventure starts here.
                </p>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <img
                  src="./assets/intro/mobile/welcome.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="./assets/intro/mobile/login.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
                <img
                  src="./assets/intro/mobile/register.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  To get started, simply enter your email and password to access
                  our remarkable applications.
                  <br />
                  <br />
                  But wait, there's more! If you're new here, you can take a
                  detour by clicking the "Register" link. Fill in your desired
                  username, email, and password and hit that "Register" button.
                  <br />
                  <br />
                  You also have the option to swiftly enter our app using either
                  your existing credentials or by signing up/in.
                  <br />
                  <br />
                  Whichever path you choose, rest assured that your adventure
                  awaits on the other side.
                </p>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <p>
                  Welcome to our Discover page!Navigate through our app in the
                  way that suits you best:
                  <br />
                  <br />
                  Map View: <br />
                  Dive into the map view of all the points of interest (POIs) by
                  clicking on the map.
                  <br />
                  <br />
                  Categories: <br />
                  Interested in something specific? Click on a category to
                  narrow down your exploration. Whether it's attractions,
                  musuem, shopping, or more, you'll find what you're looking
                  for.
                  <br />
                  <br />
                  POI Details: <br />
                  Simply click on its image to access a detailed page. From
                  descriptions to images, everything is at your fingertips.
                  <br />
                  <br />
                  Explore Button:
                  <br /> Hit the "Explore" button to reveal all the POIs waiting
                  for you to explore.
                </p>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <img
                  src="./assets/intro/mobile/discover.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="./assets/intro/mobile/pois.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
                <img
                  src="./assets/intro/mobile/selectpois.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  Welcome to our Explore page!
                  <br />
                  <br />
                  Scroll and Select: <br />
                  As you scroll down, you'll encounter a rich tapestry of points
                  of interest (POIs) waiting to be explored.
                  <br />
                  <br />
                  Create Your Itinerary: <br /> Add your chosen POIs to your
                  personalized itinerary list.
                  <br />
                  <br />
                  Itinerary Access:
                  <br />
                  Click the "Itinerary" button to your curated list.
                </p>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <p>
                  Welcome to our Itinerary Page!
                  <br />
                  <br />
                  Predicted Busyness Level: <br />
                  To ensure you have the best experience, we provide you with
                  predicted busyness levels for each POI. This insider
                  information allows you to plan your visit during quieter
                  periods, guaranteeing a more enjoyable exploration.
                  <br />
                  <br />
                  Open Time Insights: <br />
                  We understand that timing is everything. For each point of
                  interest (POI) in your selected itinerary, you can easily see
                  their opening times for the day. No more missed opportunities
                  – you'll know exactly when each POI welcomes you.
                </p>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <img
                  src="./assets/intro/mobile/itinerary.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="./assets/intro/mobile/detail.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
                <img
                  src="./assets/intro/mobile/detail2.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
                <img
                  src="./assets/intro/mobile/detail3.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>
                  Welcome to the Detail Page!
                  <br />
                  <br />
                  POIs information: <br />
                  Dive into the heart of the POI with a detailed introduction.
                  Learn about its history, significance, and what makes it a
                  must-visit destination.
                  <br />
                  <br />
                  BucketList: <br /> Falling in love with a POI? Mark it with a
                  heart!
                  <br />
                  <br />
                  While our project timeline limits the ability to save it to
                  bucket list in mobile app right now, we welcome you to explore
                  more features by signing in our website.
                </p>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <p>
                  Welcome to our Map Page!
                  <br />
                  <br />
                  Predicted Busyness Level: <br />
                  Click on a marker to reveal more than just a location.
                  Discover the anticipated busyness level, allowing you to make
                  informed decisions about when to visit. No more crowds, just
                  you and the experience you've been longing for.
                  <br />
                  <br />
                  Heat Map: <br />
                  The gradient of colors guides you through high and low
                  busyness areas, helping you tailor your route for the ultimate
                  exploration experience.
                </p>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <img
                  src="./assets/intro/mobile/map.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
                <img
                  src="./assets/intro/mobile/heatmap.png"
                  alt="welcome"
                  height="500px"
                  width="250px"
                  style={{ marginRight: "20px" }}
                />
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Welcome;
