import { useNavigate } from 'react-router-dom';
import './PageStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css' //npm install bootstrap
import '@fortawesome/fontawesome-free/css/all.css' //npm install --save @fortawesome/fontawesome-free
import Item from './Item';

function Tela2() {
  const navigate = useNavigate();

  function goToTela1() {
    navigate('/tela1');
  }

  function goToHome() {
    navigate('/');
  }

  function goToTela3() {
    navigate('/tela3');
  }  

  return (
    <div className="page">

        <i className='fas fa-laptop fa-2x'></i>

        <div className='row m5'>
          {/* controle de colunas para responsividade */}
          <div className='col-sm-8 col-md-6 m-2'>
            <Item param="22/04/2021" outro="123456789"></Item>
          </div>
          {/* controle de colunas para responsividade */}
          <div className='col-sm-8 col-md-6 m-2'>
            <Item param="22/04/2021" outro="123456789"></Item>
          </div>
        </div>
        

        <button className="page-button" onClick={goToTela1}>Tela1</button>
        <button className="page-button" onClick={goToHome}>Home</button>
        <button className="page-button" onClick={goToTela3}>Tela3</button>

    </div>
  );
}

export default Tela2;
