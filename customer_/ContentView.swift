import SwiftUI
import MapKit

var heartList :  [String] = []


//main structure.
struct ContentView: View {
    
    //setting states
    @State private var username: String = ""
    @State private var password: String = ""
    @State private var isLoggedIn: Bool = false
    
    
    
    //setting up base view
    var body: some View {
        NavigationView {
            VStack {
                Spacer()
                
                //login view
                Text("Login")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.blue)
                    .padding(.bottom, 50)
                    .frame(maxWidth: .infinity)
                
                Image(systemName: "mappin.and.ellipse")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 50, height: 50)
                    .padding(.bottom, 50)
                
                TextField("Username", text: $username)
                    //.padding()
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .autocapitalization(.none)
                
                SecureField("Password", text: $password)
                    //.padding()
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                
                NavigationLink(destination: NewView(), isActive: $isLoggedIn) {
                    Button(action: {
                        isLoggedIn = true
                    }) {
                        Text("Log In")
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(Color.blue)
                            .cornerRadius(10)
                    }
                    .padding()
                }
                
                Spacer()
                
                
            }
            .padding()
            .navigationTitle("")
            .navigationBarHidden(true) //changing state
        }
        
    }
}


//setting up view 2
struct NewView: View {
    @State private var selectedTiles: Set<Int> = []
    let tiles = ["Museums", "Outdoor Spaces", "Free Events", "Indoor Venues", "Music", "Historical Sites", "Beaches", "National Parks"]
    @State private var showButton = false
    
    var body: some View {
        NavigationView {
            
            //setting up types of poi views in grind form
            ScrollView {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 120))], spacing: 20) {
                    ForEach(0..<tiles.count, id: \.self) { index in
                        TileView(title: tiles[index], isSelected: selectedTiles.contains(index)) {
                            
                            if selectedTiles.contains(index) {
                                selectedTiles.remove(index)
                                
                            } else {
                                selectedTiles.insert(index)
                            }
                            showButton = !selectedTiles.isEmpty
                        }
                    }
                }
                .padding(.horizontal, 20)
                
                //only show next button when selected to make users pick things they are interested in
                if showButton {
                    NavigationLink(destination: NextView()) {
                        Text("Next")
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding()
                            .background(Color.blue)
                            .cornerRadius(10)
                            .padding(.top, 20)
                    }
                }
            }
            
            .padding(.vertical, 50)
            .navigationBarTitle("Select Things You Like", displayMode: .inline)
        }
        .navigationBarBackButtonHidden(true)
    }
    
    
    //Types of tiles
    struct TileView: View {
        let title: String
        let isSelected: Bool
        let action: () -> Void
        
        var body: some View {
            Button(action: {
                action()
            }) {
                VStack {
                    ZStack {
                        if isSelected {
                            RoundedRectangle(cornerRadius: 10)
                                .fill(Color.green.opacity(0.8))
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .stroke(Color.green, lineWidth: 2)
                                )
                        } else {
                            RoundedRectangle(cornerRadius: 10)
                                .fill(Color.gray.opacity(0.2))
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .stroke(Color.gray.opacity(0.5), lineWidth: 1)
                                )
                        }
                        
                        if title == "Museums" {
                            
                            Image("museum")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .cornerRadius(10)
                                .clipped()
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(Color.green.opacity(isSelected ? 0.8 : 0))
                                )
                        }
                        
                        
                        if title == "Free Events" {
                            Image("free")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .cornerRadius(10)
                                .clipped()
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(Color.green.opacity(isSelected ? 0.8 : 0))
                                )
                        }
                        
                        if title == "Indoor Venues" {
                            Image("art")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .cornerRadius(10)
                                .clipped()
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(Color.green.opacity(isSelected ? 0.8 : 0))
                                )
                        }
                        
                        if title == "Outdoor Spaces" {
                            Image("outdoor")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .cornerRadius(10)
                                .clipped()
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(Color.green.opacity(isSelected ? 0.8 : 0))
                                )
                        }
                        
                        if title == "Music" {
                            Image("music")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .cornerRadius(10)
                                .clipped()
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(Color.green.opacity(isSelected ? 0.8 : 0))
                                )
                        }
                        
                        if title == "Historical Sites" {
                            Image("history")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .cornerRadius(10)
                                .clipped()
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(Color.green.opacity(isSelected ? 0.8 : 0))
                                )
                        }
                        
                        if title == "National Parks" {
                            Image("park")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .cornerRadius(10)
                                .clipped()
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(Color.green.opacity(isSelected ? 0.8 : 0))
                                )
                        }
                        
                        if title == "Beaches" {
                            Image("beach")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .cornerRadius(10)
                                .clipped()
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(Color.green.opacity(isSelected ? 0.8 : 0))
                                )
                        }
                        
                        if isSelected {
                            Image(systemName: "checkmark")
                                .foregroundColor(.white)
                                .font(.system(size: 24, weight: .bold))
                                .opacity(0.8)
                        }
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    
                    Text(title)
                        .foregroundColor(.black)
                        .font(.headline)
                        .padding(.top, 10)
                }
            }
            .buttonStyle(PlainButtonStyle())
        }
    }
    
    //Users favourite items:
    struct FavHeartView: View {
        var body: some View {
            
            Text("Favorites")
                .font(.title)
                .padding(15)
            
            List(heartList, id: \.self) { entry in
                Text(entry)
                
            }
            .navigationBarTitle("Favorites")
        }
    }
    
    //Map view
    struct NextView: View {
        //set states
        @State private var isShowingNewView = false
        @State private var isShowingNewView2 = false
        
        @State private var isToggleOn = false
        
        var body: some View {
            NavigationView {
                //setting up vertical stack
                VStack(spacing: 0) {
                    ZStack(alignment: .bottomTrailing) {
                        MapView()
                            .frame(height: UIScreen.main.bounds.height * 0.5)
                        
                        if isToggleOn {
                            Image("heatmap")
                                .resizable()
                                .scaledToFill()
                                .frame(height: UIScreen.main.bounds.height * 0.5)
                        }
                        
                        
                        /* live busyness title -- not needed
                        VStack {
                            Text("Live busyness")
                            Toggle(isOn: $isToggleOn) {
                                Image(systemName: "toggle")
                                    .font(.title)
                                    .foregroundColor(.white)
                                    .frame(width: 60, height: 60)
                            }
                            .padding(.trailing, 20)
                            .padding(.bottom, 10)
                        }
                         */
                    }
                    
                    VStack(spacing: 5) {
                        Text("Top suggestions for you")
                            .font(.system(size: 10, weight: .ultraLight))
                            .padding(.top, 10)
                        
                        //Hard coding some test POIs as suggestions.
                        let data = [
                            (imageName: "statue", paragraph: "The Statue of Liberty: A towering symbol of freedom and democracy, enlightening the world with her torch and welcoming all to the land of opportunity."),
                            (imageName: "tower", paragraph: "The World Trade Center: A poignant testament to resilience and unity, standing tall as a powerful tribute to the human spirit and a thriving hub of commerce and remembrance."),
                            (imageName: "empire", paragraph: "The Empire State Building: Iconic skyscraper, epitomizing timeless elegance and providing stunning views of New York City."),
                            (imageName: "museum", paragraph: "The Met Museum: An artistic treasure trove, spanning centuries of masterpieces, inviting exploration into the depths of human creativity.")
                        ].map { CarouselItem(imageName: $0.imageName, paragraph: $0.paragraph) }
                        
                        CarouselView(data: data)
                            .padding(.vertical, -40)
                        
                    }
                    .frame(height: UIScreen.main.bounds.height * 0.25)
                    
                    Spacer()
                    
                    HStack {
                        Button(action: {
                            isShowingNewView = true
                        }) {
                            Image(systemName: "plus")
                            
                                .font(.title)
                                .foregroundColor(.white)
                                .frame(width: 60, height: 60)
                                .background(Color.blue)
                                .clipShape(Circle())
                            
                        }
                        .padding(.leading)
                        
                        Spacer()
                        
                        Button(action: {
                            isShowingNewView2 = true
                        }) {
                            Image(systemName: "heart")
                                .font(.title)
                                .foregroundColor(.white)
                                .frame(width: 60, height: 60)
                                .background(Color.blue)
                                .clipShape(Circle())
                        }
                        .padding(.trailing)
                    }
                    .padding(.bottom)
                }
                
                //push down segment
                .edgesIgnoringSafeArea(.bottom)
                .sheet(isPresented: $isShowingNewView) {
                    NewView2()
                }
                //pull the fav view
                .sheet(isPresented: $isShowingNewView2) {
                    FavHeartView()
                }
            }
        }
    }
    
    struct MapView: UIViewRepresentable {
        func makeUIView(context: Context) -> MKMapView {
            let mapView = MKMapView()
            mapView.delegate = context.coordinator
            
            //start hard codde
            let initialLocation = CLLocationCoordinate2D(latitude: 40.7831, longitude: -73.9712)
            let region = MKCoordinateRegion(center: initialLocation, latitudinalMeters: 10000, longitudinalMeters: 10000)
            mapView.setRegion(region, animated: false)
            
            //pin allocation
            let statueOfLibertyAnnotation = MKPointAnnotation()
            statueOfLibertyAnnotation.coordinate = CLLocationCoordinate2D(latitude: 40.6892, longitude: -74.0445)
            statueOfLibertyAnnotation.title = "Statue of Liberty"
            
            let empireStateBuildingAnnotation = MKPointAnnotation()
            empireStateBuildingAnnotation.coordinate = CLLocationCoordinate2D(latitude: 40.7484, longitude: -73.9857)
            empireStateBuildingAnnotation.title = "Empire State Building"
            
            let worldTradeCentreAnnotation = MKPointAnnotation()
            worldTradeCentreAnnotation.coordinate = CLLocationCoordinate2D(latitude: 40.7127, longitude: -74.0134)
            worldTradeCentreAnnotation.title = "World Trade Centre"
            
            let centralParkAnnotation = MKPointAnnotation()
            centralParkAnnotation.coordinate = CLLocationCoordinate2D(latitude: 40.7829, longitude: -73.9654)
            centralParkAnnotation.title = "Central Park"
            
            let metMuseumAnnotation = MKPointAnnotation()
            metMuseumAnnotation.coordinate = CLLocationCoordinate2D(latitude: 40.7794, longitude: -73.9632)
            metMuseumAnnotation.title = "The Met Museum"
            
            let topOfTheRockAnnotation = MKPointAnnotation()
            topOfTheRockAnnotation.coordinate = CLLocationCoordinate2D(latitude: 40.7587, longitude: -73.9787)
            topOfTheRockAnnotation.title = "Top of the Rock"
            
            mapView.addAnnotations([
                statueOfLibertyAnnotation,
                empireStateBuildingAnnotation,
                worldTradeCentreAnnotation,
                centralParkAnnotation,
                metMuseumAnnotation,
                topOfTheRockAnnotation
            ])
            return mapView
        }
        
        func updateUIView(_ uiView: MKMapView, context: Context) {
            //testing view
        }
        
        func makeCoordinator() -> Coordinator {
            Coordinator()
        }
        
        class Coordinator: NSObject, MKMapViewDelegate {
            func mapView(_ mapView: MKMapView, didSelect view: MKAnnotationView) {
                guard let annotation = view.annotation else {
                    return
                }
                
                let popupView = PopupView(annotation: annotation)
                popupView.show()
            }
        }
        
        class PopupView: UIView {
            let annotation: MKAnnotation
            
            init(annotation: MKAnnotation) {
                self.annotation = annotation
                super.init(frame: CGRect(x: 0, y: 0, width: 200, height: 100))
                
                //popup view style
                backgroundColor = .white
                layer.cornerRadius = 10
                
                let titleLabel = UILabel(frame: CGRect(x: 0, y: 25, width: frame.width, height: 20))
                titleLabel.text = annotation.title ?? ""
                titleLabel.textAlignment = .center
                addSubview(titleLabel)
                
                let closeButton = UIButton(type: .custom)
                closeButton.setImage(UIImage(systemName: "xmark"), for: .normal)
                closeButton.frame = CGRect(x: frame.width - 30, y: 10, width: 30, height: 30)
                closeButton.addTarget(self, action: #selector(close), for: .touchUpInside)
                addSubview(closeButton)
                
                let addButton = UIButton(type: .custom)
                addButton.setImage(UIImage(systemName: "heart"), for: .normal)
                addButton.frame = CGRect(x: (frame.width - 30) / 2, y: 60, width: 30, height: 30)
                addButton.addTarget(self, action: #selector(addToFavorites), for: .touchUpInside)
                addSubview(addButton)
            }
            
            required init?(coder: NSCoder) {
                fatalError("init(coder:) has not been implemented")
            }
            
            func show() {
                //popup
                guard let window = UIApplication.shared.windows.first else {
                    return
                }
                
                center = window.center
                window.addSubview(self)
            }
            
            @objc func close() {
                removeFromSuperview()
            }
            
            @objc func addToFavorites() {
                guard let pinTitle = annotation.title else {
                    return
                }
                //append name to global arr
                heartList.append(pinTitle!)
                //print("Heart List: \(heartList)")
                removeFromSuperview()
            }
        }
    }
    
    struct CarouselItem: Identifiable, Hashable {
        let id = UUID()
        let imageName: String
        let paragraph: String
    }
    
    
    struct CarouselView: View {
        let data: [CarouselItem]
        
        var body: some View {
            TabView {
                ForEach(data) { item in
                    HStack {
                        Image(item.imageName)
                            .resizable()
                            .frame(width: 100, height: 100)
                            .padding(.leading, 25)
                        //.cornerRadius(25)
                        
                        
                        Text(item.paragraph)
                            .font(.system(size: 12, weight: .light))
                            .foregroundColor(.white)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(Color.blue)
                            .cornerRadius(10)
                            .padding(.horizontal)
                    }
                }
            }
            .tabViewStyle(PageTabViewStyle())
            .indexViewStyle(PageIndexViewStyle(backgroundDisplayMode: .always))
        }
    }
    
    struct CircleButton: View {
        let imageName: String
        
        var body: some View {
            Button(action: {
                
            }) {
                Image(systemName: imageName)
                    .font(.title)
                    .foregroundColor(.white)
                    .frame(width: 60, height: 60)
                    .background(Color.blue)
                    .clipShape(Circle())
            }
        }
    }
    
    struct NextView_Previews: PreviewProvider {
        static var previews: some View {
            NextView()
        }
    }
    
    struct ContentView_Previews: PreviewProvider {
        static var previews: some View {
            ContentView()
        }
    }
    
    //selection view: //YING XXXXXXXXXXXXXXXXXXXXXXXXX Rows.
    struct NewView2: View {
        //pics
        let photos = ["museum", "empire", "rock", "tower", "statue"]
        let titles = ["Met Museum", "Empire state building", "Top of the Rock", "One World trade center", "Statue of liberty"]
        
        //set to track selected button indices
        @State private var selectedButtonIndices: Set<Int> = []
        
        //state variable to track visibility
        @State private var isContinueButtonVisible = false
        
        //global array to store selected positions
        @State private var positions: [String] = []
        
        //state var for view control
        @State private var navigateToNextView = false
        
        //nav view pull.
        var body: some View {
            NavigationView {
                
                ScrollView {
                    
                    VStack {
                        
                        Text("Select Things You Want to See on Your Trip")
                            .font(.headline)
                            .padding()
                        
                        LazyVStack(spacing: 10) {
                            ForEach(0..<photos.count, id: \.self) { index in
                                RowView(
                                    imageName: photos[index],
                                    title: titles[index],
                                    isSelected: selectedButtonIndices.contains(index),
                                    onSelect: { isSelected in
                                        handleSelection(index: index, isSelected: isSelected)
                                    }
                                )
                            }
                        }
                        .padding()
                        
                        if isContinueButtonVisible {
                            Button(action: {
                                handleContinueButton()
                            }) {
                                Text("Continue")
                                    .font(.headline)
                                    .foregroundColor(.white)
                                    .frame(maxWidth: .infinity)
                                    .frame(height: 50)
                                    .background(Color.green)
                                    .cornerRadius(8)
                                    .padding()
                            }
                            .disabled(navigateToNextView)
                        }
                    }
                }
                
                
                //.navigationTitle("New View")
                .sheet(isPresented: $navigateToNextView) {
                    NextView3(positions: positions)
                }
            }
        }
        
        private func handleSelection(index: Int, isSelected: Bool) {
            if isSelected {
                selectedButtonIndices.insert(index)
            } else {
                selectedButtonIndices.remove(index)
            }
            isContinueButtonVisible = !selectedButtonIndices.isEmpty
        }
        
        private func handleContinueButton() {
            positions = selectedButtonIndices.map { titles[$0] }
            selectedButtonIndices.removeAll()
            navigateToNextView = true
        }
    }
    
    //row view pull.
    struct RowView: View {
        let imageName: String
        let title: String
        let isSelected: Bool
        let onSelect: (Bool) -> Void
        
        var body: some View {
            HStack {
                Image(imageName)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 80, height: 80)
                    .cornerRadius(8)
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(Color.gray, lineWidth: 1)
                    )
                    .padding(.leading, 10)
                
                Text(title)
                    .font(.headline)
                    .foregroundColor(.primary)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 10)
                
                Button(action: {
                    onSelect(!isSelected)
                }) {
                    Image(systemName: isSelected ? "checkmark.circle.fill" : "plus.circle")
                        .font(.title)
                        .foregroundColor(isSelected ? .green : .gray)
                        .padding(.trailing, 25)
                }
            }
            .frame(height: 100)
            .background(Color.white)
            .cornerRadius(8)
            .padding(.horizontal)
            .padding(.vertical, 5)
            .shadow(color: Color.black.opacity(0.2), radius: 4, x: 0, y: 2)
        }
    }
    //selection view: //YING XXXXXXXXXXXXXXXXXXXXXXXXX END
    
    struct NextView3: View {
        let positions: [String]
        @State private var selectedPositions: Set<String> = []
        @State private var showAlert = false
        @State private var selectedPositionName = ""
        @State private var showDirectionView = false
        
        //seting hard coded POIs
        let dictionary: [String: (String, String, String)] = [
            "Met Museum": ("museum", "9am - 10am", "40.779436,-73.963244"),
            "Empire state building": ("empire", "10am - 11:30am", "40.748817,-73.985428"),
            "Top of the Rock": ("rock", "10:30am - 12 noon", "40.758740,-73.978674"),
            "One World trade center": ("tower", "3pm - 5pm", "40.712742,-74.013382"),
            "Statue of liberty": ("statue", "4pm - 6pm", "40.689249,-74.044500")
        ]
        
        let dateFormatter: DateFormatter = {
            let formatter = DateFormatter()
            formatter.dateFormat = "dd MMM yyyy"
            return formatter
        }()
        
        var body: some View {
            NavigationView {
                ScrollView {
                    VStack(spacing: 10) {
                        Text("Busy times today:")
                            .font(.title3)
                            .padding()
                        
                        Text(dateFormatter.string(from: Date()))
                            .font(.headline)
                        
                        ForEach(positions, id: \.self) { position in
                            if let (imageName, peakTime, coordinates) = dictionary[position] {
                                Button(action: {
                                    if selectedPositions.contains(position) {
                                        selectedPositions.remove(position)
                                    } else {
                                        selectedPositions.insert(position)
                                    }
                                    showAlert = true
                                    selectedPositionName = position
                                }) {
                                    HStack {
                                        Image(imageName)
                                            .resizable()
                                            .aspectRatio(contentMode: .fill)
                                            .frame(width: 80, height: 80)
                                            .cornerRadius(8)
                                            .overlay(
                                                RoundedRectangle(cornerRadius: 8)
                                                    .stroke(Color.gray, lineWidth: 1)
                                            )
                                            .padding(.leading, 10)
                                            .padding(.bottom, 10)
                                            .padding(.top, 10)
                                        
                                        VStack(alignment: .leading, spacing: 4) {
                                            Text(position)
                                                .font(.headline)
                                                .foregroundColor(.primary)
                                                .frame(maxWidth: .infinity, alignment: .leading)
                                                .padding(.horizontal, 10)
                                            
                                            HStack {
                                                Text("Peak time: ")
                                                    .font(.system(size: 16, weight: .light))
                                                
                                                Text(peakTime)
                                            }
                                            .padding(.horizontal, 10)
                                        }
                                    }
                                }
                                .buttonStyle(PlainButtonStyle())
                                .background(selectedPositions.contains(position) ? Color.yellow : Color.white)
                                .cornerRadius(8)
                                .padding(.horizontal)
                                .padding(.vertical, 5)
                                .shadow(color: Color.black.opacity(0.2), radius: 4, x: 0, y: 2)
                            }
                        }
                    }
                    .padding(.bottom)
                    .alert(isPresented: $showAlert) {
                        Alert(
                            title: Text("Do you want directions to"),
                            message: Text(selectedPositionName),
                            primaryButton: .default(Text("Yes")) {
                                showDirectionView = true
                            },
                            secondaryButton: .cancel()
                        )
                    }
                    .sheet(isPresented: $showDirectionView) {
                        MyDirectionView(positionName: selectedPositionName, coordinates: dictionary[selectedPositionName]!.2)
                    }
                }
                //.navigationTitle("Next View 3")
            }
        }
    }
    
    struct MyDirectionView: View {
        let positionName: String
        let coordinates: String
        
        var body: some View {
            VStack {
                //Text("MyDirectionView for \(positionName)")
                //    .font(.title)
                //    .padding()
                
                MapView2(coordinates: coordinates)
                //.edgesIgnoringSafeArea(.top)
                    .frame(height: 500)
                //.padding()
                
                Spacer()
            }
            //.navigationTitle("Directions View")
            
            Text(positionName)
        }
    }
    
    struct MapView2: UIViewRepresentable {
        let coordinates: String
        
        func makeUIView(context: Context) -> MKMapView {
            MKMapView(frame: .zero)
        }
        
        func updateUIView(_ view: MKMapView, context: Context) {
            let coordinateArray = coordinates.split(separator: ",").compactMap { Double($0) }
            if coordinateArray.count == 2 {
                let destinationLatitude = coordinateArray[0]
                let destinationLongitude = coordinateArray[1]
                
                //set point to hilton hotel
                let sourceCoordinate = CLLocationCoordinate2D(latitude: 40.7626, longitude: -73.9797)
                let destinationCoordinate = CLLocationCoordinate2D(latitude: destinationLatitude, longitude: destinationLongitude)
                
                let sourcePlacemark = MKPlacemark(coordinate: sourceCoordinate)
                let destinationPlacemark = MKPlacemark(coordinate: destinationCoordinate)
                
                let sourceItem = MKMapItem(placemark: sourcePlacemark)
                let destinationItem = MKMapItem(placemark: destinationPlacemark)
                
                let request = MKDirections.Request()
                request.source = sourceItem
                request.destination = destinationItem
                request.transportType = .automobile
                
                let directions = MKDirections(request: request)
                directions.calculate { response, error in
                    guard let route = response?.routes.first else {
                        if let error = error {
                            print("not working")
                        }
                        return
                    }
                    view.addOverlay(route.polyline, level: .aboveRoads)
                    view.setVisibleMapRect(route.polyline.boundingMapRect, animated: true)
                }
                
                view.delegate = context.coordinator
                
                let span = MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
                let region = MKCoordinateRegion(center: destinationCoordinate, span: span)
                view.setRegion(region, animated: true)
                
                let annotation = MKPointAnnotation()
                annotation.coordinate = destinationCoordinate
                view.addAnnotation(annotation)
            }
        }
        
        func makeCoordinator() -> Coordinator {
            Coordinator()
        }
        
        class Coordinator: NSObject, MKMapViewDelegate {
            func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
                let renderer = MKPolylineRenderer(overlay: overlay)
                renderer.strokeColor = UIColor.blue
                renderer.lineWidth = 5
                return renderer
            }
        }
    }
    
    struct NextView3_Previews: PreviewProvider {
        static var previews: some View {
            NextView3(positions: ["Met Museum", "Empire state building", "Top of the Rock", "One World trade center", "Statue of liberty"])
        }
    }
    
    
}
