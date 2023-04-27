"use client";
import React, { useState, useEffect, useMemo } from 'react'
import { useLoadScript, GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { getmarkerIcon, getMarkerColor } from '../utils/utils';

interface Props {
  climateData: any;
  selectedRiskYear: any
}
export default function ClimateRiskMap({ climateData, selectedRiskYear }: Props) {

  const [isShowInfoWindow, setIsShowInfoWindow]: any = useState(false);
  const [infoWindowMarker, setInfoWindowMarker]: any = useState();
  const [riskMarkers, setRiskMarkers]: any = useState();

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
        markerColor: getMarkerColor(riskData.RiskRating),
        assetName: riskData.AssetName,
        buisnessCat: riskData.BusinessCategory
      }
    });
    setRiskMarkers(markers);
  }, [selectedRiskYear]);


  if (!isLoaded) {
    return <p>Loading...</p>;
  }

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
            icon={getmarkerIcon(marker.markerColor)}
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
};
