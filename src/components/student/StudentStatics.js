import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";
import Paper from '@mui/material/Paper';


function StudentStatics({ studentData }) {
    // //Gender Chart Data Calculation
    const totalStudents = studentData.length;
    const malePercentageCount = (totalStudents > 0) ? (((studentData.filter((student) => student.gender == "male").length) * 100) / totalStudents) : 0;
    const femalePercentageCount = (totalStudents > 0) ? (((studentData.filter((student) => student.gender == "female").length) * 100) / totalStudents) : 0;

    const genderData = {
        labels: [
            'Male',
            'Female'
        ],
        datasets: [{
            label: 'Gender Data',
            data: [malePercentageCount, femalePercentageCount],
            backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)'
            ],
            hoverOffset: 4
        }]
    };
    // End of Code

    //Top 5 Student marks calculation
    const studentDataCopy = structuredClone(studentData);//Copy Array
    studentDataCopy.sort(function (a, b) { return b.marks - a.marks; });//Sort By Marks
    const top5Studentitems = studentDataCopy.slice(0, 5);//Get Max 5 Recrod Data

    let topMarksLabel = top5Studentitems.map((student) => `${student.firstName} ${student.lastName}`);
    const topMarksData = {
        labels: topMarksLabel,
        datasets: [{
            label: 'Top 5 Students Marks',
            data: top5Studentitems.map((student) => student.marks),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ]
        }]
    };
    // End of Code

    //State wise Students Count Start
    const stateWiseStudents = studentData.reduce(function (acc, curr) {
        if (acc[curr.state.trim()]) {
            acc[curr.state.trim()] = ++acc[curr.state.trim()];
        } else {
            acc[curr.state.trim()] = 1;
        }
        return acc;
    }, {});

    // Chart Data
    const stateWiseStudentsChart = {
        labels: Object.keys(stateWiseStudents),
        datasets: [{
            label: 'State wise Student',
            data: Object.values(stateWiseStudents),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
            tension: 0.1
        }]
    };

    // End of code


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={3} mb={20}>
                        <Grid item xs={12} sm={4}>
                            <h4>PieChart (Gender Percentage)</h4>
                            <Paper variant="outlined" square>
                                <PieChart chartData={genderData} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <h4>Bar Chart (Top 5 Students)</h4>
                            <Paper variant="outlined" square>
                                <BarChart chartData={topMarksData} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <h4>LineChart</h4>
                            <Paper variant="outlined" square>
                                <LineChart chartData={stateWiseStudentsChart} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default StudentStatics