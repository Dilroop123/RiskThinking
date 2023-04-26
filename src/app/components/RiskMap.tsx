"use client";
import React, { useState, useEffect, useMemo } from 'react'
import { useLoadScript, GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { markerColor } from '../constants/constants';

interface Props {
  climateData: any;
  selectedRiskYear: any
}
export default function RiskMap({ climateData, selectedRiskYear }: Props) {

  const [isShowInfoWindow, setIsShowInfoWindow]: any = useState(false);
  const [infoWindowMarker, setInfoWindowMarker]: any = useState();
  const [riskMarkers, setRiskMarkers]: any = useState();

  function markerIcon(color: string) {
    return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 1
    };
  }

  const setMarkerColor = (riskScore: string) => {
    const score = Number(riskScore);
    if (score >= 0 && score <= 0.09)
      return markerColor.yellow;
    if (score >= 0.1 && score <= 0.19)
      return markerColor.green;
    if (score >= 0.2 && score <= 0.29)
      return markerColor.orange;
    if (score >= 0.3 && score <= 0.39)
      return markerColor.grey;
    if (score >= 0.4 && score <= 0.49)
      return markerColor.purple;
    if (score >= 0.5 && score <= 0.59)
      return markerColor.red;
    if (score >= 0.6 && score <= 0.69)
      return markerColor.black;
    if (score >= 0.7 && score <= 0.79)
      return markerColor.pink;
    if (score >= 0.8 && score <= 0.89)
      return markerColor.teal;
    if (score >= 0.9 && score <= 0.99)
      return markerColor.navy;
    if (score == 1)
      return markerColor.brown;
  }

  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(
    () => ({ lat: 43.86682, lng: -79.2663 }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAugK5qRO81UHNZU1xGhVc4-owSFPyvA9E',
    libraries: libraries as any,
  });

  useEffect(() => {
    const markers = climateData.filter((riskData: any) => {
      return riskData.Year === selectedRiskYear;
    }).map((riskData: any, index: any) => {
      return {
        lat: Number(riskData.Lat),
        lng: Number(riskData.Long),
        key: index,
        markerColor: setMarkerColor(riskData.RiskRating),
        assetName: riskData.AssetName,
        buisnessCat: riskData.BusinessCategory
      }
    });
    setRiskMarkers(markers);
  }, [selectedRiskYear]);


  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  // console.log(riskMarkers);

  return (
    <div>

      <GoogleMap
        zoom={3.5}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '700px', height: '700px' }}
        onLoad={() => console.log('Map Component Loaded...')}
      >
        {riskMarkers.length > 0 && riskMarkers?.map((marker: any) => {
          return <MarkerF
            position={marker}
            key={marker.key}

            onLoad={() => console.log('Marker loaded')}
            icon={markerIcon(marker.markerColor)}
            onClick={(e) => {
              setIsShowInfoWindow(true)
              setInfoWindowMarker(marker);
            }}
          >
            {isShowInfoWindow && !!infoWindowMarker && infoWindowMarker.key === marker.key &&
              (<InfoWindowF
                onCloseClick={() => setIsShowInfoWindow(false)}>
                <div style={{ border: 'solid blue round', borderRadius: '8px', padding: '5px' }}>
                  <h4>{infoWindowMarker.assetName}</h4>
                  <h4 style={{ color: 'gray' }}>{infoWindowMarker.buisnessCat}</h4>
                </div>
              </InfoWindowF>
              )}
          </MarkerF>
        })}
      </GoogleMap>
    </div>
  )
}
