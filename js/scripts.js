// Data management
let lastUpdate = null;
let cachedData = null;

// Currency formatter
const currencyFormatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
});

// Temperature formatter
const tempFormatter = (temp) => `${temp}°C`;

// Percentage formatter
const percentFormatter = (value) => `${value}%`;

function generateCityData(city) {
    const cityData = {
        'Lagos': {
            crimeRate: {
                score: 75,
                details: 'High crime rate in certain areas. Major concerns include traffic robberies and pickpocketing.',
                rating: 4.2
            },
            housing: {
                averagePrice: 75000000, // 75M Naira average in mainland
                monthlyRent: 800000, // 800K Naira for 3 bedroom in mainland
                priceToIncomeRatio: 23.6
            },
            weather: {
                current: 27,
                average: 28,
                humidity: 80,
                rainfall: '1500mm'
            },
            costOfLiving: {
                score: 78,
                categories: {
                    groceries: 'Very Expensive',
                    transport: 'Expensive',
                    utilities: 'Moderate',
                    healthcare: 'Expensive',
                    education: 'Very Expensive',
                    entertainment: 'Expensive'
                }
            },
            salary: {
                averageSalary: 150000, // Monthly
                professions: {
                    'Software Engineer': 450000,
                    'Teacher': 80000,
                    'Doctor': 350000,
                    'Sales': 120000,
                    'Nurse': 120000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 15400000,
                growth: 3.2,
                density: 7800
            },
            demographics: {
                medianAge: 19,
                ethnicGroups: {
                    'Yoruba': 65,
                    'Igbo': 15,
                    'Hausa': 10,
                    'Others': 10
                },
                education: 85,
                employment: 65
            }
        },
        'Abuja': {
            crimeRate: {
                score: 45,
                details: 'Moderate crime rate. Better security in central areas.',
                rating: 2.8
            },
            housing: {
                averagePrice: 65000000, // 65M Naira average
                monthlyRent: 1200000, // 1.2M Naira for 3 bedroom in central area
                priceToIncomeRatio: 18.2
            },
            weather: {
                current: 32,
                average: 30,
                humidity: 45,
                rainfall: '1100mm'
            },
            costOfLiving: {
                score: 82,
                categories: {
                    groceries: 'Very Expensive',
                    transport: 'Moderate',
                    utilities: 'Expensive',
                    healthcare: 'Expensive',
                    education: 'Very Expensive',
                    entertainment: 'Very Expensive'
                }
            },
            salary: {
                averageSalary: 180000, // Monthly
                professions: {
                    'Software Engineer': 500000,
                    'Teacher': 100000,
                    'Doctor': 400000,
                    'Sales': 150000,
                    'Nurse': 140000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 3600000,
                growth: 5.3,
                density: 2000
            },
            demographics: {
                medianAge: 25,
                ethnicGroups: {
                    'Hausa': 25,
                    'Yoruba': 20,
                    'Igbo': 20,
                    'Others': 35
                },
                education: 90,
                employment: 75
            }
        },
        'Port Harcourt': {
            crimeRate: {
                score: 65,
                details: 'Moderate to high crime rate. Security concerns in certain areas.',
                rating: 3.5
            },
            housing: {
                averagePrice: 45000000, // 45M Naira average
                monthlyRent: 600000, // 600K Naira for 3 bedroom
                priceToIncomeRatio: 16.8
            },
            weather: {
                current: 26,
                average: 27,
                humidity: 85,
                rainfall: '2300mm'
            },
            costOfLiving: {
                score: 70,
                categories: {
                    groceries: 'Expensive',
                    transport: 'Moderate',
                    utilities: 'Expensive',
                    healthcare: 'Moderate',
                    education: 'Expensive',
                    entertainment: 'Moderate'
                }
            },
            salary: {
                averageSalary: 160000, // Monthly
                professions: {
                    'Software Engineer': 400000,
                    'Teacher': 85000,
                    'Doctor': 380000,
                    'Sales': 130000,
                    'Nurse': 130000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 3100000,
                growth: 2.9,
                density: 2300
            },
            demographics: {
                medianAge: 23,
                ethnicGroups: {
                    'Ikwerre': 35,
                    'Ijaw': 25,
                    'Igbo': 25,
                    'Others': 15
                },
                education: 82,
                employment: 68
            }
        },
        'Kano': {
            crimeRate: {
                score: 55,
                details: 'Moderate crime rate with periodic security challenges.',
                rating: 3.2
            },
            housing: {
                averagePrice: 35000000, // 35M Naira average
                monthlyRent: 400000, // 400K Naira for 3 bedroom
                priceToIncomeRatio: 15.5
            },
            weather: {
                current: 35,
                average: 33,
                humidity: 35,
                rainfall: '850mm'
            },
            costOfLiving: {
                score: 60,
                categories: {
                    groceries: 'Moderate',
                    transport: 'Affordable',
                    utilities: 'Moderate',
                    healthcare: 'Moderate',
                    education: 'Moderate',
                    entertainment: 'Affordable'
                }
            },
            salary: {
                averageSalary: 120000, // Monthly
                professions: {
                    'Software Engineer': 350000,
                    'Teacher': 70000,
                    'Doctor': 300000,
                    'Sales': 100000,
                    'Nurse': 110000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 4100000,
                growth: 2.5,
                density: 1900
            },
            demographics: {
                medianAge: 20,
                ethnicGroups: {
                    'Hausa': 75,
                    'Fulani': 15,
                    'Others': 10
                },
                education: 75,
                employment: 62
            }
        },
        'Ibadan': {
            crimeRate: {
                score: 50,
                details: 'Moderate crime rate. Generally safer than larger cities.',
                rating: 3.0
            },
            housing: {
                averagePrice: 40000000, // 40M Naira average
                monthlyRent: 450000, // 450K Naira for 3 bedroom
                priceToIncomeRatio: 16.2
            },
            weather: {
                current: 28,
                average: 29,
                humidity: 75,
                rainfall: '1300mm'
            },
            costOfLiving: {
                score: 65,
                categories: {
                    groceries: 'Moderate',
                    transport: 'Affordable',
                    utilities: 'Moderate',
                    healthcare: 'Moderate',
                    education: 'Expensive',
                    entertainment: 'Moderate'
                }
            },
            salary: {
                averageSalary: 130000, // Monthly
                professions: {
                    'Software Engineer': 380000,
                    'Teacher': 75000,
                    'Doctor': 320000,
                    'Sales': 110000,
                    'Nurse': 115000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 3800000,
                growth: 2.3,
                density: 1500
            },
            demographics: {
                medianAge: 22,
                ethnicGroups: {
                    'Yoruba': 85,
                    'Others': 15
                },
                education: 80,
                employment: 65
            }
        },
        'Benin City': {
            crimeRate: {
                score: 60,
                details: 'Moderate to high crime rate. Exercise caution in certain areas.',
                rating: 3.3
            },
            housing: {
                averagePrice: 38000000,
                monthlyRent: 400000,
                priceToIncomeRatio: 15.8
            },
            weather: {
                current: 28,
                average: 29,
                humidity: 78,
                rainfall: '1800mm'
            },
            costOfLiving: {
                score: 65,
                categories: {
                    groceries: 'Moderate',
                    transport: 'Affordable',
                    utilities: 'Moderate',
                    healthcare: 'Moderate',
                    education: 'Expensive',
                    entertainment: 'Moderate'
                }
            },
            salary: {
                averageSalary: 125000,
                professions: {
                    'Software Engineer': 350000,
                    'Teacher': 75000,
                    'Doctor': 300000,
                    'Sales': 100000,
                    'Nurse': 110000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 1750000,
                growth: 2.8,
                density: 1200
            },
            demographics: {
                medianAge: 21,
                ethnicGroups: {
                    'Bini': 65,
                    'Esan': 15,
                    'Igbo': 10,
                    'Others': 10
                },
                education: 78,
                employment: 63
            }
        },
        'Enugu': {
            crimeRate: {
                score: 45,
                details: 'Relatively low crime rate. Generally safe during daytime.',
                rating: 2.5
            },
            housing: {
                averagePrice: 35000000,
                monthlyRent: 350000,
                priceToIncomeRatio: 14.5
            },
            weather: {
                current: 27,
                average: 28,
                humidity: 75,
                rainfall: '1900mm'
            },
            costOfLiving: {
                score: 60,
                categories: {
                    groceries: 'Moderate',
                    transport: 'Affordable',
                    utilities: 'Moderate',
                    healthcare: 'Moderate',
                    education: 'Moderate',
                    entertainment: 'Affordable'
                }
            },
            salary: {
                averageSalary: 120000,
                professions: {
                    'Software Engineer': 320000,
                    'Teacher': 70000,
                    'Doctor': 280000,
                    'Sales': 95000,
                    'Nurse': 100000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 1200000,
                growth: 2.5,
                density: 1000
            },
            demographics: {
                medianAge: 23,
                ethnicGroups: {
                    'Igbo': 85,
                    'Others': 15
                },
                education: 82,
                employment: 65
            }
        },
        'Kaduna': {
            crimeRate: {
                score: 58,
                details: 'Moderate crime rate with occasional security challenges.',
                rating: 3.1
            },
            housing: {
                averagePrice: 32000000,
                monthlyRent: 300000,
                priceToIncomeRatio: 14.2
            },
            weather: {
                current: 33,
                average: 31,
                humidity: 40,
                rainfall: '1000mm'
            },
            costOfLiving: {
                score: 58,
                categories: {
                    groceries: 'Affordable',
                    transport: 'Affordable',
                    utilities: 'Moderate',
                    healthcare: 'Moderate',
                    education: 'Moderate',
                    entertainment: 'Affordable'
                }
            },
            salary: {
                averageSalary: 115000,
                professions: {
                    'Software Engineer': 300000,
                    'Teacher': 65000,
                    'Doctor': 270000,
                    'Sales': 90000,
                    'Nurse': 95000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 1800000,
                growth: 2.7,
                density: 1100
            },
            demographics: {
                medianAge: 20,
                ethnicGroups: {
                    'Hausa': 60,
                    'Fulani': 20,
                    'Others': 20
                },
                education: 75,
                employment: 60
            }
        },
        'Abeokuta': {
            crimeRate: {
                score: 40,
                details: 'Lower crime rate compared to major cities.',
                rating: 2.3
            },
            housing: {
                averagePrice: 30000000,
                monthlyRent: 250000,
                priceToIncomeRatio: 13.5
            },
            weather: {
                current: 29,
                average: 30,
                humidity: 70,
                rainfall: '1200mm'
            },
            costOfLiving: {
                score: 55,
                categories: {
                    groceries: 'Affordable',
                    transport: 'Affordable',
                    utilities: 'Moderate',
                    healthcare: 'Moderate',
                    education: 'Moderate',
                    entertainment: 'Affordable'
                }
            },
            salary: {
                averageSalary: 110000,
                professions: {
                    'Software Engineer': 280000,
                    'Teacher': 65000,
                    'Doctor': 250000,
                    'Sales': 85000,
                    'Nurse': 90000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 600000,
                growth: 2.1,
                density: 800
            },
            demographics: {
                medianAge: 24,
                ethnicGroups: {
                    'Yoruba': 90,
                    'Others': 10
                },
                education: 80,
                employment: 65
            }
        },
        'Warri': {
            crimeRate: {
                score: 62,
                details: 'Moderate to high crime rate. Exercise caution in certain areas.',
                rating: 3.4
            },
            housing: {
                averagePrice: 42000000,
                monthlyRent: 450000,
                priceToIncomeRatio: 16.2
            },
            weather: {
                current: 27,
                average: 28,
                humidity: 82,
                rainfall: '2100mm'
            },
            costOfLiving: {
                score: 68,
                categories: {
                    groceries: 'Moderate',
                    transport: 'Affordable',
                    utilities: 'Expensive',
                    healthcare: 'Moderate',
                    education: 'Expensive',
                    entertainment: 'Moderate'
                }
            },
            salary: {
                averageSalary: 140000,
                professions: {
                    'Software Engineer': 380000,
                    'Teacher': 80000,
                    'Doctor': 350000,
                    'Sales': 120000,
                    'Nurse': 125000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 900000,
                growth: 2.6,
                density: 1600
            },
            demographics: {
                medianAge: 22,
                ethnicGroups: {
                    'Urhobo': 45,
                    'Itsekiri': 35,
                    'Ijaw': 15,
                    'Others': 5
                },
                education: 80,
                employment: 65
            }
        },
        'Owerri': {
            crimeRate: {
                score: 48,
                details: 'Moderate crime rate. Generally safe during daytime.',
                rating: 2.8
            },
            housing: {
                averagePrice: 38000000,
                monthlyRent: 380000,
                priceToIncomeRatio: 15.5
            },
            weather: {
                current: 28,
                average: 29,
                humidity: 78,
                rainfall: '2000mm'
            },
            costOfLiving: {
                score: 62,
                categories: {
                    groceries: 'Moderate',
                    transport: 'Affordable',
                    utilities: 'Moderate',
                    healthcare: 'Moderate',
                    education: 'Expensive',
                    entertainment: 'Moderate'
                }
            },
            salary: {
                averageSalary: 125000,
                professions: {
                    'Software Engineer': 340000,
                    'Teacher': 75000,
                    'Doctor': 320000,
                    'Sales': 100000,
                    'Nurse': 110000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 850000,
                growth: 2.4,
                density: 1400
            },
            demographics: {
                medianAge: 23,
                ethnicGroups: {
                    'Igbo': 90,
                    'Others': 10
                },
                education: 85,
                employment: 68
            }
        },
        'Calabar': {
            crimeRate: {
                score: 45,
                details: 'Lower crime rate. Known for being tourist-friendly.',
                rating: 2.6
            },
            housing: {
                averagePrice: 35000000,
                monthlyRent: 350000,
                priceToIncomeRatio: 14.8
            },
            weather: {
                current: 27,
                average: 28,
                humidity: 85,
                rainfall: '2400mm'
            },
            costOfLiving: {
                score: 60,
                categories: {
                    groceries: 'Moderate',
                    transport: 'Affordable',
                    utilities: 'Moderate',
                    healthcare: 'Moderate',
                    education: 'Moderate',
                    entertainment: 'Affordable'
                }
            },
            salary: {
                averageSalary: 120000,
                professions: {
                    'Software Engineer': 320000,
                    'Teacher': 70000,
                    'Doctor': 300000,
                    'Sales': 95000,
                    'Nurse': 105000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 600000,
                growth: 2.2,
                density: 1200
            },
            demographics: {
                medianAge: 24,
                ethnicGroups: {
                    'Efik': 60,
                    'Ibibio': 25,
                    'Others': 15
                },
                education: 82,
                employment: 66
            }
        },
        'Jos': {
            crimeRate: {
                score: 52,
                details: 'Moderate crime rate with occasional security challenges.',
                rating: 3.0
            },
            housing: {
                averagePrice: 32000000,
                monthlyRent: 300000,
                priceToIncomeRatio: 14.2
            },
            weather: {
                current: 22,
                average: 23,
                humidity: 45,
                rainfall: '1200mm'
            },
            costOfLiving: {
                score: 58,
                categories: {
                    groceries: 'Affordable',
                    transport: 'Affordable',
                    utilities: 'Moderate',
                    healthcare: 'Moderate',
                    education: 'Moderate',
                    entertainment: 'Affordable'
                }
            },
            salary: {
                averageSalary: 115000,
                professions: {
                    'Software Engineer': 300000,
                    'Teacher': 65000,
                    'Doctor': 280000,
                    'Sales': 90000,
                    'Nurse': 100000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 900000,
                growth: 2.3,
                density: 1000
            },
            demographics: {
                medianAge: 22,
                ethnicGroups: {
                    'Berom': 40,
                    'Hausa': 30,
                    'Fulani': 20,
                    'Others': 10
                },
                education: 78,
                employment: 62
            }
        },
        'Uyo': {
            crimeRate: {
                score: 46,
                details: 'Relatively low crime rate. Generally safe for residents and visitors.',
                rating: 2.7
            },
            housing: {
                averagePrice: 34000000,
                monthlyRent: 320000,
                priceToIncomeRatio: 14.5
            },
            weather: {
                current: 27,
                average: 28,
                humidity: 82,
                rainfall: '2300mm'
            },
            costOfLiving: {
                score: 59,
                categories: {
                    groceries: 'Moderate',
                    transport: 'Affordable',
                    utilities: 'Moderate',
                    healthcare: 'Moderate',
                    education: 'Moderate',
                    entertainment: 'Affordable'
                }
            },
            salary: {
                averageSalary: 118000,
                professions: {
                    'Software Engineer': 310000,
                    'Teacher': 68000,
                    'Doctor': 290000,
                    'Sales': 92000,
                    'Nurse': 102000
                }
            },
            tax: {
                incomeTax: 24,
                vatTax: 7.5,
                propertyTax: 0.5
            },
            population: {
                total: 500000,
                growth: 2.5,
                density: 1100
            },
            demographics: {
                medianAge: 23,
                ethnicGroups: {
                    'Ibibio': 70,
                    'Annang': 20,
                    'Others': 10
                },
                education: 83,
                employment: 65
            }
        }
    };
    
    return cityData[city];
}

function updateCityHeaders(city1Name, city2Name) {
    const city1Header = document.getElementById('city1Header');
    const city2Header = document.getElementById('city2Header');

    city1Header.innerHTML = `
        <h2>${city1Name}</h2>
        <p>Detailed statistics and information</p>
    `;

    city2Header.innerHTML = `
        <h2>${city2Name}</h2>
        <p>Detailed statistics and information</p>
    `;
}

function updateCrimeSection(city1Data, city2Data, city1Name, city2Name) {
    const crimeSection = document.getElementById('crimeSection');
    const diff = Math.abs(city1Data.crimeRate.score - city2Data.crimeRate.score);
    const higherCrime = city1Data.crimeRate.score > city2Data.crimeRate.score ? city1Name : city2Name;
    
    crimeSection.innerHTML = `
        <div class="side-by-side-comparison">
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city1Name}</h4>
                </div>
                <div class="data-row">
                    <span class="data-label">Crime Score</span>
                    <span class="data-value">${city1Data.crimeRate.score}/100</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Safety Rating</span>
                    <span class="data-value">${generateStars(city1Data.crimeRate.rating)}</span>
                </div>
                <p class="data-details">${city1Data.crimeRate.details}</p>
            </div>
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city2Name}</h4>
                </div>
                <div class="data-row">
                    <span class="data-label">Crime Score</span>
                    <span class="data-value">${city2Data.crimeRate.score}/100</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Safety Rating</span>
                    <span class="data-value">${generateStars(city2Data.crimeRate.rating)}</span>
                </div>
                <p class="data-details">${city2Data.crimeRate.details}</p>
            </div>
        </div>
        <div class="comparison-label">
            <span class="stat-difference ${diff > 30 ? 'negative' : diff > 15 ? 'neutral' : 'positive'}">
                ${diff}% difference in crime rates
            </span>
        </div>
    `;
}

function updateHousingSection(city1Data, city2Data, city1Name, city2Name) {
    const housingSection = document.getElementById('housingSection');
    
    housingSection.innerHTML = `
        <div class="side-by-side-comparison">
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city1Name}</h4>
                </div>
                <div class="price-card">
                    <h4>Average House Price</h4>
                    <div class="price">${currencyFormatter.format(city1Data.housing.averagePrice)}</div>
                </div>
                <div class="price-card">
                    <h4>Monthly Rent (3 Bedroom)</h4>
                    <div class="price">${currencyFormatter.format(city1Data.housing.monthlyRent)}</div>
                </div>
                <div class="data-row">
                    <span class="data-label">Price to Income Ratio</span>
                    <span class="data-value">${city1Data.housing.priceToIncomeRatio.toFixed(1)}</span>
                </div>
            </div>
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city2Name}</h4>
                </div>
                <div class="price-card">
                    <h4>Average House Price</h4>
                    <div class="price">${currencyFormatter.format(city2Data.housing.averagePrice)}</div>
                </div>
                <div class="price-card">
                    <h4>Monthly Rent (3 Bedroom)</h4>
                    <div class="price">${currencyFormatter.format(city2Data.housing.monthlyRent)}</div>
                </div>
                <div class="data-row">
                    <span class="data-label">Price to Income Ratio</span>
                    <span class="data-value">${city2Data.housing.priceToIncomeRatio.toFixed(1)}</span>
                </div>
            </div>
        </div>
    `;
}

function updateWeatherSection(city1Data, city2Data, city1Name, city2Name) {
    const weatherSection = document.getElementById('weatherSection');
    
    weatherSection.innerHTML = `
        <div class="side-by-side-comparison">
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city1Name}</h4>
                </div>
                <div class="weather-info">
                    <div class="temperature">${tempFormatter(city1Data.weather.current)}</div>
                    <div class="weather-details">
                        <p>Average: ${tempFormatter(city1Data.weather.average)}</p>
                        <p>Humidity: ${percentFormatter(city1Data.weather.humidity)}</p>
                        <p>Annual Rainfall: ${city1Data.weather.rainfall}</p>
                    </div>
                </div>
            </div>
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city2Name}</h4>
                </div>
                <div class="weather-info">
                    <div class="temperature">${tempFormatter(city2Data.weather.current)}</div>
                    <div class="weather-details">
                        <p>Average: ${tempFormatter(city2Data.weather.average)}</p>
                        <p>Humidity: ${percentFormatter(city2Data.weather.humidity)}</p>
                        <p>Annual Rainfall: ${city2Data.weather.rainfall}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateCostOfLivingSection(city1Data, city2Data, city1Name, city2Name) {
    const colSection = document.getElementById('costOfLivingSection');
    
    const categories = Object.keys(city1Data.costOfLiving.categories);
    
    colSection.innerHTML = `
        <div class="side-by-side-comparison">
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city1Name}</h4>
                </div>
                <div class="data-row">
                    <span class="data-label">Cost of Living Score</span>
                    <span class="data-value">${city1Data.costOfLiving.score}/100</span>
                </div>
            </div>
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city2Name}</h4>
                </div>
                <div class="data-row">
                    <span class="data-label">Cost of Living Score</span>
                    <span class="data-value">${city2Data.costOfLiving.score}/100</span>
                </div>
            </div>
        </div>
        <div class="category-grid">
            <div class="category-header">
                <span>Category</span>
                <span>${city1Name}</span>
                <span>${city2Name}</span>
            </div>
            ${categories.map(category => `
                <div class="category-row">
                    <span class="category-name">${category}</span>
                    <span class="category-rating ${getRatingClass(city1Data.costOfLiving.categories[category])}">
                        ${city1Data.costOfLiving.categories[category]}
                    </span>
                    <span class="category-rating ${getRatingClass(city2Data.costOfLiving.categories[category])}">
                        ${city2Data.costOfLiving.categories[category]}
                    </span>
                </div>
            `).join('')}
        </div>
    `;
}

function updateSalarySection(city1Data, city2Data, city1Name, city2Name) {
    const salarySection = document.getElementById('salarySection');
    
    salarySection.innerHTML = `
        <div class="side-by-side-comparison">
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city1Name}</h4>
                </div>
                <div class="price-card">
                    <h4>Average Monthly Salary</h4>
                    <div class="price">${currencyFormatter.format(city1Data.salary.averageSalary)}</div>
                </div>
            </div>
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city2Name}</h4>
                </div>
                <div class="price-card">
                    <h4>Average Monthly Salary</h4>
                    <div class="price">${currencyFormatter.format(city2Data.salary.averageSalary)}</div>
                </div>
            </div>
        </div>
        <div class="category-grid">
            <div class="category-header">
                <span>Profession</span>
                <span>${city1Name}</span>
                <span>${city2Name}</span>
            </div>
            ${Object.entries(city1Data.salary.professions).map(([profession, salary1]) => `
                <div class="category-row">
                    <span class="category-name">${profession}</span>
                    <span class="data-value">${currencyFormatter.format(salary1)}</span>
                    <span class="data-value">${currencyFormatter.format(city2Data.salary.professions[profession])}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function updateTaxSection(city1Data, city2Data, city1Name, city2Name) {
    const taxSection = document.getElementById('taxSection');
    
    taxSection.innerHTML = `
        <div class="side-by-side-comparison">
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city1Name}</h4>
                </div>
                <div class="data-row">
                    <span class="data-label">Income Tax</span>
                    <span class="data-value">${percentFormatter(city1Data.tax.incomeTax)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">VAT</span>
                    <span class="data-value">${percentFormatter(city1Data.tax.vatTax)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Property Tax</span>
                    <span class="data-value">${percentFormatter(city1Data.tax.propertyTax)}</span>
                </div>
            </div>
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city2Name}</h4>
                </div>
                <div class="data-row">
                    <span class="data-label">Income Tax</span>
                    <span class="data-value">${percentFormatter(city2Data.tax.incomeTax)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">VAT</span>
                    <span class="data-value">${percentFormatter(city2Data.tax.vatTax)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Property Tax</span>
                    <span class="data-value">${percentFormatter(city2Data.tax.propertyTax)}</span>
                </div>
            </div>
        </div>
    `;
}

function updatePopulationSection(city1Data, city2Data, city1Name, city2Name) {
    const populationSection = document.getElementById('populationSection');
    
    populationSection.innerHTML = `
        <div class="side-by-side-comparison">
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city1Name}</h4>
                </div>
                <div class="data-row">
                    <span class="data-label">Total Population</span>
                    <span class="data-value">${city1Data.population.total.toLocaleString()}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Growth Rate</span>
                    <span class="data-value">${percentFormatter(city1Data.population.growth)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Density</span>
                    <span class="data-value">${city1Data.population.density}/km²</span>
                </div>
            </div>
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city2Name}</h4>
                </div>
                <div class="data-row">
                    <span class="data-label">Total Population</span>
                    <span class="data-value">${city2Data.population.total.toLocaleString()}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Growth Rate</span>
                    <span class="data-value">${percentFormatter(city2Data.population.growth)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Density</span>
                    <span class="data-value">${city2Data.population.density}/km²</span>
                </div>
            </div>
        </div>
    `;
}

function updateDemographicsSection(city1Data, city2Data, city1Name, city2Name) {
    const demographicsSection = document.getElementById('demographicsSection');
    
    demographicsSection.innerHTML = `
        <div class="side-by-side-comparison">
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city1Name}</h4>
                </div>
                <div class="data-row">
                    <span class="data-label">Median Age</span>
                    <span class="data-value">${city1Data.demographics.medianAge}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Education Rate</span>
                    <span class="data-value">${percentFormatter(city1Data.demographics.education)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Employment Rate</span>
                    <span class="data-value">${percentFormatter(city1Data.demographics.employment)}</span>
                </div>
                <div class="ethnic-groups">
                    <h5>Ethnic Groups</h5>
                    ${Object.entries(city1Data.demographics.ethnicGroups)
                        .map(([group, percentage]) => `
                            <div class="data-row">
                                <span class="data-label">${group}</span>
                                <span class="data-value">${percentFormatter(percentage)}</span>
                            </div>
                        `).join('')}
                </div>
            </div>
            <div class="city-data">
                <div class="city-data-header">
                    <h4>${city2Name}</h4>
                </div>
                <div class="data-row">
                    <span class="data-label">Median Age</span>
                    <span class="data-value">${city2Data.demographics.medianAge}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Education Rate</span>
                    <span class="data-value">${percentFormatter(city2Data.demographics.education)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Employment Rate</span>
                    <span class="data-value">${percentFormatter(city2Data.demographics.employment)}</span>
                </div>
                <div class="ethnic-groups">
                    <h5>Ethnic Groups</h5>
                    ${Object.entries(city2Data.demographics.ethnicGroups)
                        .map(([group, percentage]) => `
                            <div class="data-row">
                                <span class="data-label">${group}</span>
                                <span class="data-value">${percentFormatter(percentage)}</span>
                            </div>
                        `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Helper functions
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return `
        ${'★'.repeat(fullStars)}
        ${hasHalfStar ? '½' : ''}
        ${'☆'.repeat(emptyStars)}
    `;
}

function getRatingClass(rating) {
    switch(rating.toLowerCase()) {
        case 'very expensive':
            return 'very-expensive';
        case 'expensive':
            return 'expensive';
        case 'moderate':
            return 'moderate';
        case 'affordable':
            return 'affordable';
        case 'very affordable':
            return 'very-affordable';
        default:
            return 'moderate';
    }
}

function generateAnalysis(city1Data, city2Data, city1Name, city2Name) {
    const analysis = {
        costAnalysis: analyzeCost(city1Data, city2Data, city1Name, city2Name),
        qualityOfLife: analyzeQualityOfLife(city1Data, city2Data, city1Name, city2Name),
        careerProspects: analyzeCareerProspects(city1Data, city2Data, city1Name, city2Name),
        overallRecommendation: generateRecommendation(city1Data, city2Data, city1Name, city2Name)
    };

    return `
        <div class="analysis-section">
            <div class="analysis-content">
                <h2 class="analysis-header">Detailed Analysis</h2>
                <div class="analysis-grid">
                    <div class="analysis-card">
                        <h3>💰 Cost Analysis</h3>
                        <p>${analysis.costAnalysis}</p>
                    </div>
                    <div class="analysis-card">
                        <h3>🌟 Quality of Life</h3>
                        <p>${analysis.qualityOfLife}</p>
                    </div>
                    <div class="analysis-card">
                        <h3>💼 Career Prospects</h3>
                        <p>${analysis.careerProspects}</p>
                    </div>
                    <div class="analysis-card">
                        <h3>📋 Overall Recommendation</h3>
                        <p>${analysis.overallRecommendation}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function analyzeCost(city1Data, city2Data, city1Name, city2Name) {
    const costDiff = city1Data.costOfLiving.score - city2Data.costOfLiving.score;
    const housingDiff = city1Data.housing.averagePrice - city2Data.housing.averagePrice;
    
    let analysis = `${city1Name} is ${Math.abs(costDiff)}% ${costDiff > 0 ? 'more' : 'less'} expensive overall than ${city2Name}. `;
    analysis += `Housing prices are ${housingDiff > 0 ? 'higher' : 'lower'} in ${city1Name}, with a difference of ${currencyFormatter.format(Math.abs(housingDiff))}. `;
    analysis += `Monthly rent for a 3-bedroom apartment averages ${currencyFormatter.format(city1Data.housing.monthlyRent)} in ${city1Name} compared to ${currencyFormatter.format(city2Data.housing.monthlyRent)} in ${city2Name}.`;
    
    return analysis;
}

function analyzeQualityOfLife(city1Data, city2Data, city1Name, city2Name) {
    const crimeDiff = city1Data.crimeRate.score - city2Data.crimeRate.score;
    
    let analysis = `${city1Name} has ${crimeDiff > 0 ? 'higher' : 'lower'} crime rates than ${city2Name}. `;
    analysis += `The weather in ${city1Name} is ${city1Data.weather.average}°C on average with ${city1Data.weather.rainfall} annual rainfall. `;
    analysis += `${city1Name} has a population density of ${city1Data.population.density}/km², which ${city1Data.population.density > city2Data.population.density ? 'may feel more crowded' : 'offers more space'} compared to ${city2Name}.`;
    
    return analysis;
}

function analyzeCareerProspects(city1Data, city2Data, city1Name, city2Name) {
    const salaryDiff = city1Data.salary.averageSalary - city2Data.salary.averageSalary;
    const employmentDiff = city1Data.demographics.employment - city2Data.demographics.employment;
    
    let analysis = `Average salaries in ${city1Name} are ${salaryDiff > 0 ? 'higher' : 'lower'} by ${currencyFormatter.format(Math.abs(salaryDiff))} monthly. `;
    analysis += `The employment rate is ${employmentDiff > 0 ? 'better' : 'lower'} by ${Math.abs(employmentDiff)}%. `;
    analysis += `Key industries in ${city1Name} offer varying opportunities, with software engineers earning around ${currencyFormatter.format(city1Data.salary.professions['Software Engineer'])} monthly.`;
    
    return analysis;
}

function generateRecommendation(city1Data, city2Data, city1Name, city2Name) {
    const factors = {
        cost: city2Data.costOfLiving.score - city1Data.costOfLiving.score,
        safety: city2Data.crimeRate.score - city1Data.crimeRate.score,
        salary: city1Data.salary.averageSalary - city2Data.salary.averageSalary,
        employment: city1Data.demographics.employment - city2Data.demographics.employment
    };
    
    const totalScore = Object.values(factors).reduce((a, b) => a + b, 0);
    
    let recommendation = `Based on our analysis, `;
    if (totalScore > 20) {
        recommendation += `${city1Name} appears to be a significantly better choice for most people. `;
    } else if (totalScore > 0) {
        recommendation += `${city1Name} has a slight edge over ${city2Name}. `;
    } else if (totalScore < -20) {
        recommendation += `${city2Name} appears to be a significantly better choice for most people. `;
    } else {
        recommendation += `both cities have their own advantages. `;
    }
    
    recommendation += `Consider your priorities: ${city1Name} ${factors.cost > 0 ? 'is more expensive but' : 'is more affordable and'} 
        ${factors.salary > 0 ? 'offers higher salaries' : 'has lower average salaries'}. 
        ${factors.safety > 0 ? 'Safety is better' : 'Security might be a concern'} in ${city1Name}.`;
    
    return recommendation;
}

function updateOverviewSection(city1Data, city2Data, city1Name, city2Name) {
    // Get the overview sections for both cities
    const overviewSection1 = document.getElementById('overviewSection1');
    const overviewSection2 = document.getElementById('overviewSection2');

    // Create overview content for city 1
    const city1Overview = `
        <div class="city-data">
            <div class="city-data-header">
                <h4>${city1Name}</h4>
            </div>
            <div class="overview-stats">
                <div class="data-row">
                    <span class="data-label">Average Housing Price:</span>
                    <span class="data-value">${currencyFormatter.format(city1Data.housing.averagePrice)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Average Monthly Rent:</span>
                    <span class="data-value">${currencyFormatter.format(city1Data.housing.monthlyRent)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Average Salary:</span>
                    <span class="data-value">${currencyFormatter.format(city1Data.salary.averageSalary)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Cost of Living Score:</span>
                    <span class="data-value">${city1Data.costOfLiving.score}/100</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Population:</span>
                    <span class="data-value">${city1Data.population.total.toLocaleString()}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Crime Rate:</span>
                    <span class="data-value">${city1Data.crimeRate.score}/100</span>
                </div>
            </div>
        </div>
    `;

    // Create overview content for city 2
    const city2Overview = `
        <div class="city-data">
            <div class="city-data-header">
                <h4>${city2Name}</h4>
            </div>
            <div class="overview-stats">
                <div class="data-row">
                    <span class="data-label">Average Housing Price:</span>
                    <span class="data-value">${currencyFormatter.format(city2Data.housing.averagePrice)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Average Monthly Rent:</span>
                    <span class="data-value">${currencyFormatter.format(city2Data.housing.monthlyRent)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Average Salary:</span>
                    <span class="data-value">${currencyFormatter.format(city2Data.salary.averageSalary)}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Cost of Living Score:</span>
                    <span class="data-value">${city2Data.costOfLiving.score}/100</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Population:</span>
                    <span class="data-value">${city2Data.population.total.toLocaleString()}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Crime Rate:</span>
                    <span class="data-value">${city2Data.crimeRate.score}/100</span>
                </div>
            </div>
        </div>
    `;

    // Update the overview sections
    overviewSection1.innerHTML = city1Overview;
    overviewSection2.innerHTML = city2Overview;
}

function updateRecommendationSection(city1Data, city2Data, city1Name, city2Name) {
    const recommendationSection = document.getElementById('recommendationSection');
    
    const analysis = {
        costAnalysis: analyzeCost(city1Data, city2Data, city1Name, city2Name),
        qualityOfLife: analyzeQualityOfLife(city1Data, city2Data, city1Name, city2Name),
        careerProspects: analyzeCareerProspects(city1Data, city2Data, city1Name, city2Name),
        overallRecommendation: generateRecommendation(city1Data, city2Data, city1Name, city2Name)
    };
    
    recommendationSection.innerHTML = `
        <h2 class="recommendation-header">Final Analysis</h2>
        <div class="recommendation-grid">
            <div class="recommendation-card">
                <h3>💰 Cost Analysis</h3>
                <p>${analysis.costAnalysis}</p>
            </div>
            <div class="recommendation-card">
                <h3>🌟 Quality of Life</h3>
                <p>${analysis.qualityOfLife}</p>
            </div>
            <div class="recommendation-card">
                <h3>💼 Career Prospects</h3>
                <p>${analysis.careerProspects}</p>
            </div>
            <div class="recommendation-card">
                <h3>📋 Overall Recommendation</h3>
                <p>${analysis.overallRecommendation}</p>
            </div>
        </div>
    `;
}

// Main comparison function
function compareCities() {
    try {
        const city1 = document.getElementById('city1').value;
        const city2 = document.getElementById('city2').value;
        
        if (!city1 || !city2) {
            alert('Please select both cities to compare');
            return;
        }
        
        if (city1 === city2) {
            alert('Please select different cities to compare');
            return;
        }
        
        const city1Data = generateCityData(city1);
        const city2Data = generateCityData(city2);
        
        // Update city headers
        updateCityHeaders(city1, city2);
        
        // Update overview section
        updateOverviewSection(city1Data, city2Data, city1, city2);
        
        // Update all sections
        updateHousingSection(city1Data, city2Data, city1, city2);
        updateCostOfLivingSection(city1Data, city2Data, city1, city2);
        updateWeatherSection(city1Data, city2Data, city1, city2);
        updateCrimeSection(city1Data, city2Data, city1, city2);
        updateSalarySection(city1Data, city2Data, city1, city2);
        updateTaxSection(city1Data, city2Data, city1, city2);
        updatePopulationSection(city1Data, city2Data, city1, city2);
        updateDemographicsSection(city1Data, city2Data, city1, city2);
        
        // Update recommendation section
        updateRecommendationSection(city1Data, city2Data, city1, city2);
        
        // Show results
        document.getElementById('comparisonContainer').classList.add('active');
        
        // Scroll to results
        document.getElementById('comparisonContainer').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error in compareCities:', error);
        alert('An error occurred while comparing cities. Please try again.');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const compareButton = document.getElementById('compareButton');
    if (compareButton) {
        compareButton.addEventListener('click', compareCities);
    }
    
    // City selection change handlers
    const citySelects = document.querySelectorAll('select');
    citySelects.forEach(select => {
        select.addEventListener('change', () => {
            document.getElementById('comparisonContainer').classList.remove('active');
        });
    });
});