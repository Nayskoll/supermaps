# Supermaps

This project is a web-based itinerary application that helps users plan their trips by providing an interactive map with customizable activities and day planning features. The app allows users to add activities to specific days of their itinerary, and the activities are displayed on a map with modern pins and detailed pop-ups for each location.

## Features

- **Interactive Map**: A map powered by Leaflet where users can visualize the locations of their selected activities.
- **Day-by-Day Planning**: Users can organize activities into specific days for their itinerary.
- **Modern Pin Design**: Each activity is marked on the map with a modern, custom-designed pin.
- **Pop-up Info Bubbles**: Clicking on a pin displays a pop-up with details about the location and its description.
- **Drag-and-Drop Activities**: Users can drag and drop activities between different days or back into the initial list.
- **Responsive Design**: The application is fully responsive and works on various screen sizes.

## Technologies Used

- **Frontend**:
  - HTML
  - CSS (with custom styles for the modern pin design)
  - JavaScript
  - Leaflet.js for interactive maps
- **Backend**:
  - Python (Flask)
  - LocalStorage for temporary data storage

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/supermaps.git
    cd supermaps
    ```

2. Set up a virtual environment and activate it:

    ```bash
    python3 -m venv myvirtualenv
    source myvirtualenv/bin/activate
    ```

3. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask app:

    ```bash
    flask run
    ```

5. Open your browser and go to `http://127.0.0.1:5000/` to access the app.

## Usage

1. **Adding Activities**: Users can browse through a list of activities, which they can drag and drop into specific days of their itinerary.
2. **Viewing the Map**: The activities are displayed on a map using custom pins. Clicking on a pin will show more information about the location.
3. **Organizing Activities**: Activities can be moved between days or returned to the initial list if no longer needed in the itinerary.

## Customization

If you wish to customize the app (e.g., modify map settings or add new features), you can edit the following files:

- **`static/css/styles.css`**: To change the appearance of the app.
- **`templates/`**: Modify the HTML templates used for rendering the UI.
- **`app.py`**: Modify the backend functionality or add new routes.

## Contribution

Contributions are welcome! If you find any issues or want to enhance the app, feel free to create a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

