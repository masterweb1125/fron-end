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


export const Pane = () => {

    const [series, setSeries] = useState([{data: [[0, 0], [0, 0], [0, 0] , [0, 0], [0, 0], [0, 0], [0, 0] , [0, 0]]}]);

    const [options] = useState({
           colors: ['#E9A628'],

           chart: {
           },

           grid: {
                  borderColor: '#ADADAD',
                  strokeDashArray: 3,
                  show: true,      // you can either change hear to disable all grids
                  xaxis: {
                    lines: {
                      show: true  //or just here to disable only x axis grids
                     }
                   },
                  yaxis: {
                    lines: {
                      show: true  //or just here to disable only y axis
                     }
                   }
             },

            yaxis: {
                min: 0,
                max: 35,
                show: true,
                reversed: true,
                labels: {
                        show: true,
                        align: 'right',
                        minWidth: 0,
                        maxWidth: 160,
                        style: {
                            colors: '#E9A628',
                            fontSize: '12px',
                            fontFamily: 'roboto',
                            fontWeight: 400,
                            },
                        rotate: 0,
                        },
                 axisBorder: {
                      show: false,
                      color: '#E9E9E9',
                      width: 2
                  },
                 axisTicks: {
                      show: true,
                      color: '#E9E9E9',
                      width: 6
                  },

                 title: {
                      text: 'prof. (m da p.c.)',
                      rotate: -90,
                      style: {
                          color: '#E9A628',
                          fontSize: '14px',
                          fontFamily: 'roboto',
                          fontWeight: 600,
                  },
                 },
            },

            xaxis: {
                type:'numeic',
                show: true,
                min: 0,
                max: 30,
                tickAmount: 6,
                labels: {
                        show: true,
                        style: {
                            colors: '#E9A628',
                            fontSize: '12px',
                            fontFamily: 'roboto',
                            fontWeight: 400,
                            },
                        rotate: 0,
                        },
                 axisBorder: {
                      show: false,
                      color: '#E9E9E9',
                      width: '100%'
                  },
                 axisTicks: {
                      show: true,
                      color: '#E9E9E9',
                      width: 6
                  },

                 title: {
                      text: 'Qc (MPa)',
                      rotate: 0,
                      style: {
                          color: '#E9A628',
                          fontSize: '14px',
                          fontFamily: 'roboto',
                          fontWeight: 600,
                  },
                 },
            },
                                });

    useEffect(() => {
      const getData = async () => {
          try {
            const res = await dt();
            setSeries([{data: [[1, 0], [3.8, 8], [28, 12] , [10, 16], [13, 20], [15, 25], [18, 30] , [20, 35]]}]);
          }
          catch (err) {
            setSeries({data: [[0, 0], [0, 0], [0, 0] , [0, 0], [0, 0], [0, 0], [0, 0] , [0, 0]]});
          }
        };
        getData();
    }, []);

    return (
        <ReactApexChart options={options} series={series} type="line" height= '350px' width='70%' />
      );
}