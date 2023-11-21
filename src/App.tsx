import styles from "./App.module.css";
import { Register } from "./components/Register";

function App() {
  return (
    <main className={styles.app}>
      <Register />
    </main>
  );
}

export default App;
