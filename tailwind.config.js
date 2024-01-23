/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:{
      fontFamily:{
        'oldStandard': 'Old Standard TT, serif',
        'roboto': 'Roboto, sans-serif',
        'robotoMono':"Roboto Mono, monospace",
        'montSerrat':"Montserrat, sans-serif",
        'libre':"Libre Baskerville, serif",
        'garamond': "EB Garamond, serif",
        'fastHand': "Fasthand, cursive",
        'cursive':"Cookie, cursive",
        'dafoe': "Mr Dafoe, cursive",
        'norican' : "Norican, cursive",
        'oswald' : "Oswald, sans-serif"
      },

    },
    keyframes: {
      showNotification:{
        '0%':{
          top: '-5rem'
        },
        '5%':{
          top:'5rem'
        },
        '95%':{
          top:'5rem'
        },
        '100%':{
          top:'-5rem'
        }
      },
      showList:{
        '0%':{
          height: '0rem'
        },
        '100%':{
          height:'17rem'
        }
      },
      showListReverse:{
        '0%':{
          height: '17rem'
        },
        '100%':{
          height:'0rem'
        }
      },
      showListMobile:{
        '0%':{
          height: '0rem'
        },
        '100%':{
          height:'12rem'
        }
      },
      showListMobileReverse:{
        '0%':{
          height: '12rem'
        },
        '100%':{
          height:'0rem'
        }
      },
      rotateArrow:{
        '0%':{
          rotate:"-90deg"
        },
        '100%':{
          rotate:"0"
        }
      },
      rotateArrowReverse:{
        '0%':{
          rotate:"0"
        },
        '100%':{
          rotate:"-90deg"
        }
      },
      underlineAnim:{
        '0%':{
          width:"0"
        },
        '100%':{
          width:"100%"
        }
      },
      underlineAnimReverse:{
        '0%':{
          width:"100%"
        },
        '100%':{
          width:"0"
        }
      },
      aboutBtn:{
        '0%':{
          background:"transparent",
          color:"white"
        },
        '100%':{
          background:"white",
          color:"black"
        }
      },
      aboutBtnReverse:{
        '0%':{
      
          background:"white",
          color:"black"
        },
        '100%':{
          background:"transparent",
          color:"white"
        }
      },
      topLine:{
        '0%':{
          top:"0.3rem",
          rotate:"0deg"
        },
        '100%':{
          top:"0.6rem",
          rotate:"45deg"
        }
      },
      bottomLine:{
        '0%':{
          top:"0.9rem",
          rotate:"0deg"
        },
        '100%':{
          top:"0.35rem",
          rotate:"-45deg"
        }
      },
      topLineReverse:{
        '0%':{
      
          top:"0.6rem",
          rotate:"45deg"
        },
        '100%':{
          top:"0.3rem",
          rotate:"0deg"
        }
      },
      bottomLineReverse:{
        '0%':{
        
          top:"0.35rem",
          rotate:"-45deg"
        },
        '100%':{
          top:"0.9rem",
          rotate:"0deg"
        }
      },
      appear:{
        '0%':{
          opacity:"0"
        },
        '100%':{
          opacity:"100%"
        }
      },
      disappear:{
        '0%':{
          opacity:"100%"
        },
        '100%':{
          opacity:"0"
        }
      },
      buyBtn:{
        '0%':{
          background:"transparent",
          color:"black"
        },
        '100%':{
          background:"black",
          color:"white"
        }
      },
      buyBtnReverse:{
        '0%':{
          background:"black",
          color:"white"
        },
        '100%':{
          background:"transparent",
          color:"black"
        }
      },
      menuAppear:{
        '0%':{
         width:"0",
         opacity:"0"
        },
        '100%':{
          width:"12rem",
          opacity:"1"
        }
      },
      menuAppearReverse:{
        '0%':{
         width:"12rem",
         opacity:"1"
        },
        '100%':{
          width:"0",
          opacity:"0"
        }
      },
    
    },
  },
  plugins: [],
}