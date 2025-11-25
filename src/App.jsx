import './App.css';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

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
