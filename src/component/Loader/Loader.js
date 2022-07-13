import "./Loader.css";

function Loader (props) {
    return <div className='Loader'>
        <div class="lds-ripple">
            <div></div>
            <div></div>
        </div>
        <div>Loading Map</div>
    </div>
}

export default Loader