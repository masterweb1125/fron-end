import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const dt = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://dj-pm.herokuapp.com/datacpt/proves/`)
      .then((res) => {
        const longeur = res.data;
        const filtercpt = longeur.filter((len) => len.tipo_prova === 'CPT');
        const lencpt = filtercpt.length;
        const filtercptu = longeur.filter((len) => len.tipo_prova === 'CPTU');
        const lencptu = filtercptu.length;
        const filtercpte = longeur.filter((len) => len.tipo_prova === 'CPTE');
        const lencpte = filtercpte.length;
        //this.setState({ persons, longeur });
        resolve({
          lencpt,
          lencptu,
          lencpte,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};



export const Graph = () => {

    const [series, setSeries] = useState([0, 0, 0]);

      const [options] = useState({
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '18px',
        fontFamily: 'roboto',
        fontWeight: 800,
        colors: ['#CC929292'],
      },
      background: {
        enabled: true,
        foreColor: 'black',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#E9A628',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45,
        },
      },
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: true,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: true,
      theme: false,
      style: {
        fontSize: '14px',
        fontFamily: 'roboto',
      },
    },
    labels: ['CPT', 'CPTU', 'CPTE'],

    colors: ['#E8560D', '#0DACE8', '#E2EC20'],
    chart: {
      foreColor: '#E9A628',
    },
    stroke: {
      colors: ['black'],
    },
    legend: {
      show: true,
      position: 'top',
      fontSize: '16px',
      fontFamily: 'roboto',
      fontWeight: 400,
      foreColor: '#E9A628',
    },

    responsive: [
      {
        breakpoint: 550,
        options: {
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '6px',
            },
          },
          tooltip: {
            style: {
              fontSize: '6px',
            },
          },
          chart: {
            width: '30%',
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  });

        useEffect(() => {
    const getData = async () => {
      try {
        const res = await dt();
        setSeries([res.lencpt, res.lencptu, res.lencpte]);
      } catch (err) {
        setSeries([0, 0, 0]);
      }
    };
    getData();
  }, []);

    return (
        <ReactApexChart options={options} series={series} type="donut" />
      );
}








