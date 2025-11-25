<<<<<<< HEAD
import './App.css';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Common/Header/Header';
import Footer from './components/Common/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-body">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

  export default App;
=======
import AppRoutes from "./routes/AppRoutes";

function App() {
  return <AppRoutes />;
}

export default App;
>>>>>>> ea8a994 (FE cua Ton)
