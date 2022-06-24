module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
 

  theme: {
    screens: {
      'xsl':{'min':'320px', 'max': '767px'},
      'xs': {'min': '320px', 'max': '639px'},
      'sm': {'min': '640px', 'max': '768px'},
      'mdl':{'min':'320px', 'max': '1024px'},
      'md': {'min': '769px', 'max': '1023px'},
      'lg': {'min': '1024px', 'max': '1279px'},
      'xl': {'min': '1280px', 'max': '1535px'},
      '2xl': {'min': '1536px'},
    },
    
    extend: {
      
      backgroundColor: theme => ({
        'bgErBlue': '#374ea2',
        'bgDarkBlue': '#273771',
        'bgSideNav': '#4A4B57',
        'bgBody':'#E5E5E5',
        'bgEcomm':'#F6F5F7',
        'withRun':'#F6FFEB',
        'velocity':'#F3FBFF',
        'credit':'#FBF9E6',
        'corporate':'#FFF4F4',
        'lighterGrey': '#F6F6F6',
        'bgRedLight':'#FFF7F6',
        'redshade' : '#FFF7F7',
        'bglightred' : '#FDDCDA',
        'orange' : '#EF4129',
        'greylightbg': '#F8F8F8',
        'bglightyello':'#FFF5D0',
        'bglightorange':'#FFD2A8',
        'bgdarkgrey': "#575757",
        'bglightorangeshade':"#FFE8E6",
        'bgbluecolor': "#3A4EFF",
        'bgGreenlight':'#47BD1D',
        'bgmandatorysign':'#FF0000',
        'bgCancelbutton':"#A0A0A1",
        'bgthead':"#060606",
        'bgyellow':'#FF9534',
        'bgpinkcolor':'#FF1E8A',
        'bglightgrey':'#F9F9F9',
        'bglightPink':'#FCE7E7',
        'bgpurplelight':'#E9E9FF',
        'bgGreenLight':'#DEFABB',
        'bglightgreye':'#EEEEEE',
        'bgtransparent':"#00000073",
        'bglightPBank':'#C9E8FB',
        'bgVMTapprove' : '#47BD1D',
        'bglightVMTApprove':'#F2FCEE',
        'bgGreenApprove' : "#19BD16",
        'bglightyellow':'#EFECD5',
        'bgtransparent':"#00000073",

       
       }),
       zIndex: {
        'zindex999': 100000,
        'zindex99': 99999,
        'zindex88': 8888,
       },

      colors: {
        'erBlue':'#374ea2',
        'darkBlue':'#273771',
        'orange':'#FF2F12',
        'bgSideNav':'#4A4B57',
        'bgIcon':'#3A3A44',
        'darkGray':'#4A4B57',
        'white':'#ffffff',
        'lightGrey':'#E5E5E5',
        'grey':'#9696A0',
        'greyLightShade':'#D2D2D6',
        'greylightBorder':'#DCDCDC',
        'greyBorder':'#7085D3',
        'shadow':'#dcdcdc33',
        'greycolor':'#5A5B6A',
        'bgsearchsm':'#f0f0f1',
        'greyshade':'#787885',
        'textgrey': '#B4B4BB',
        'blackshade':"#19191D",
        'mandatorysign':'#FF0000',
        'orange':'#FF862E',
        'green':'#6AC259',
        "redRequired": "#FF1301",
        'rejectcolor':'#FF3B3B',
        'bordercolor':'#BECDD7',
        'ligherblack' : "#3E3E3E",
        'boldyellow': '#FF9534',
        'textdarkgrey': "#575757",
        'bluecolor': "#3A4EFF",
        'pinkcolor':'#FF1E8A',
        'bgvlight':'#E3E3E3',
        'bgGreen': '#54D119',
        'bglightgreycolor':'#F6F5F7',
        'bglightgreencolor':'#F6FFEB',
        'bglightbluecolor':'#F3FBFF',
        'bglightyellowcolor':'#FBF9E6',
        'bglightredcolor':'#FFF4F4',

        // VMT
        'TextdarkBlue': '#2584BF',



      },
      borderRadius: {
        'br5': '5px',
        'br8': '8px',
        'br10': '10px',
        'br50': '50px',
        'br12': '12px',
      },
      minWidth: {
        '0': '0',
        '1/5': '20%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
       },
       width: {
        'w10px': '10px',
        'w30px': '30px',
        'w35px': '35px',
        'w68px' : '68px',
        'width70px': '70px',
        'w79px': '79px',
        'w115px': '115px',
        'w224':'224px',
        'w300':'300px',
        'w325' : '325px',
        'w345':'345px',
        'serchwidth': '21rem',
        'w420': '626px',
        'w445px': '445px',  
        'w450px': '450px',  
        'selectboxwidth':'461px',
        'w840' : '840px',
        'widthMain':'calc(100% - 70px)',
        'widthforFormSection':'calc(100% - 345px)',
        'widthforWorkDetailSection':'calc(100% - 445px)',
      },
      height: {
        'h10px': '10px',
        'h30px': '30px',

        'h35px': '35px',
        'h34px':'h34px',
        'h58px': '58px',
        'h68px' : '68px',
        'h106': '106px',
        'h442':'442px',
        'h600': '600px',
        'heightSideNav':'calc(100vh - 58px)',
        'max-h-85vh':'85vh',
        'max-h-80vh':'80vh',
        'max-h-95vh':'95vh',
        'max-h-70vh':'70vh',

      },
     
      inset: {
        'top58px': '58px',
        'top157': '157px',
        'top16': '-16px',
        'bottom6': '-6px',
        'left651': '-651px',
        'top183': '-183px' ,
        'top121': '-121px',
        'left71': '71px',

      },

      borderColor: theme => ({
        'borderhome': '#7085D3',
        'borderBreadcrumb': '#DCDCDC',
      }),

      margin: {
        ml70px: '70px',
        mt58px: '58px',
        mt19px: '19px',
        mb19px: '19px',
        m28: '28px',
        m26: '26px',
        m49: '49px',
        m22: '22px',
        m13: '13px',
        m15: '15px',
        m5: '5px',
      
       },
       padding:{
        pt2px: '2px',
        p5px: '5px',
        p7px: '7px',
        p9px: '9px',
        p11px: '11px',
        pr14px: '14px',
        pt21:'21px',
        pb30:'30px',
        p19:'19px',
        p26:'26px',
        p35:'35px',
        p26:'26px',
        p15:'15px',
        p10:'10px',

       },
       gap: {
        '26': '26px',
       },
       fontSize: {
        font10px: ['10px', {
          lineHeight: '12px',
        }],
        font11: ['11px', {
          lineHeight: '24px',
        }],
        font13px: ['13px', {
          lineHeight: '16px',
        }],
        font18: ['18px', {
          lineHeight: '16px',
        }],
        font26: ['26px', {
          lineHeight: '29px',
        }],
        font28: ['28px', {
          lineHeight: '36px',
        }],
       
        font32: ['32px', {
          lineHeight: '36px',
        }],
      },


    },


    stroke: theme => ({
      'red': theme('colors.red.500'),
    }),
  
  },
  variants: {
    extend: {
      // ...
     stroke: ['hover', 'focus'],
     display: ["group-hover"],
    }

  },
  plugins: [],
}
