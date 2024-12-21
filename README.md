# Mental Health  App

A **Meditation Timer App** built with **React Native** using **Expo**. This app provides a guided meditation experience with audio playback and a customizable timer, designed for simplicity and focus.

## Features

- **Meditation Timer**: Starts a timer for a 1-minute meditation session by default, with the ability to adjust the duration.
- **Audio Playback**: Plays calming meditation audio during the session.
- **Dynamic Backgrounds**: Each meditation session displays a visually pleasing background image.
- **Pause/Resume Functionality**: Pause and resume both the timer and audio playback.
- **Responsive Design**: Works seamlessly on both Android and iOS devices.
- **Adjustable Timer**: Navigate to an adjustment screen to change the meditation duration.
- **Auto-Stop**: The timer stops and pauses the audio automatically when the session ends.

---

## Tech Stack

- **React Native**: For building the user interface.
- **Expo Router**: For seamless navigation between screens.
- **Expo AV**: For handling audio playback.
- **Context API**: For managing shared timer state.
- **TypeScript**: For type safety and robust code.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name/meditation-timer-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd meditation-timer-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Expo development server:
   ```bash
   npm start
   ```

---

## Usage

1. **Launch the App**:
   - Start the app using an Android or iOS device, or an emulator.

2. **Start a Meditation Session**:
   - Click the "Start Meditation" button to begin the session.
   - The timer will countdown from the default 1 minute.

3. **Adjust Meditation Duration**:
   - Click the "Adjust Duration" button to navigate to the duration adjustment screen.
   - Set your preferred meditation duration.

4. **Pause or Resume**:
   - The "Stop" button pauses both the timer and audio playback.
   - Click "Start Meditation" again to resume from where you left off.

5. **End the Session**:
   - The session will stop automatically when the timer reaches 0, or you can manually stop it.

---


## Code Walkthrough

### 1. Timer Management (`TimerContext`)
The timer logic is encapsulated in a React Context, allowing for state sharing across the app. The timer decrements by 1 second until it reaches 0 or is paused manually.

### 2. Meditation Screen
The `Page` component:
- Displays the countdown timer.
- Plays the audio for the session.
- Pauses/stops audio and resets the timer when the session ends.

### 3. Adjustable Duration
A separate screen allows users to modify the session duration. The new duration is stored in the `TimerContext`.

---

## Key Files

- **TimerContext**: Shared context managing the countdown timer.
- **MeditationData**: Stores metadata for audio files and background images.
- **Meditation Screen (`Page`)**: Handles the main meditation session, including timer, audio, and navigation.

---

## Improvements for Future Versions

- **Customizable Themes**: Add light and dark mode options.
- **Longer Sessions**: Allow more flexible durations (e.g., 5, 10, or 30 minutes).
- **Progress Tracking**: Log meditation sessions and display statistics.
- **User Profiles**: Enable saving preferences for individual users.
- **Guided Meditations**: Offer voice-guided options.

---

## Dependencies

- `expo-router`: For navigation.
- `expo-av`: For audio playback.
- `react-native`: Core framework for building cross-platform apps.

---

## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Open a pull request.

---

## License

This project is licensed under the [GNU](LICENSE).
