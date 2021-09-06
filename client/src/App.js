import React, { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';
//import marker from './marker.png';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 28.7041,
    longitude: 77.1025,
    zoom: 4,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude ] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };


  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/stuti-saini/ckt63ont92kqz18oe4jy09wly"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      dblclick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
            >
              <div
                onClick={() => setShowPopup({
                  //...showPopup,
                  [entry._id]: true,
                })}
              >
                <div>
                <img className="marker"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width:  `${6 * viewport.zoom}px`,
                }} src="https://i.imgur.com/y0G5YTX.png" alt=""/> 
                  </div>
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                    {entry.image && <img src={entry.image} alt={entry.title} />}
                  </div>
                </Popup>
              ) : null
            }
          </React.Fragment>
        ))
      }
      {
        addEntryLocation ? (
          <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div>
                <img className="marker"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width:  `${6 * viewport.zoom}px`,
                }} src="https://i.imgur.com/y0G5YTX.png" alt=""/> 
                  </div> 
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true} 
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
            <div className="popup">
              <LogEntryForm onClose={() => {
                setAddEntryLocation(null);
                getEntries();
              }} location={addEntryLocation} />
            </div>
          </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}

export default App;