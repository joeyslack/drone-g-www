

function GetCookieTable(updateValue)
      {  
          
          console.log("Have previous values")
    let STable1={};
    let STable2={};
    let ITable1={};
    let ITable2={};

      STable1.SMission= getCookie('S1Mission');
      STable1.SStructure= getCookie("S1Structure")
      STable1.SCount =getCookie("S1Count")
      STable1.SDate =getCookie("S1Date")
      STable1.STime =getCookie("S1Time")
      STable1.SDownload =getCookie("S1Download")

      STable2.SMission= getCookie('S2Mission');
      STable2.SStructure= getCookie("S2Structure")
      STable2.SCount =getCookie("S2Count")
      STable2.SDate =getCookie("S2Date")
      STable2.STime =getCookie("S2Time")
      STable2.SDownload =getCookie("S2Download")
    
      ITable1.IPhotos =getCookie("I1Photos")
      ITable1.IProduct =getCookie("I1Product")
      ITable1.IUPC =getCookie("I1UPC")
      ITable1.IQuantity =getCookie("I1Quantity")
      ITable1.ICondition =getCookie("I1Condition")
      ITable1.ILocation= getCookie("I1Location")
      ITable1.IDate=getCookie("I1Date")
      ITable1.IDescription = getCookie("I1Description")

      ITable2.IPhotos =getCookie("I2Photos")
      ITable2.IProduct =getCookie("I2Product")
      ITable2.IUPC =getCookie("I2UPC")
      ITable2.IQuantity = getCookie("I2Quantity")
      ITable2.ICondition =getCookie("I2Condition")
      ITable2.ILocation= getCookie("I2Location")
      ITable2.IDate= getCookie("I2Date")
      ITable2.IDescription = getCookie("I2Description")

      updateValue('STable1',STable1);
      updateValue('STable2',STable2);
      
      updateValue('ITable1',ITable1);
      updateValue('ITable2',ITable2);
      return;
      
      }
     function Initialize(updateValue)
      {   
        
        console.log("INITIALIZING")
          let ITable1={};
          let ITable2={};
          let STable1={};
          let STable2={};
          
          STable1.SMission='true'
          STable1.SStructure='true'
          STable1.SCount='true'
          STable1.SDate='true'
          STable1.STime='true'
          STable1.SDownload='true'
  
          STable2.SMission='true'
          STable2.SStructure='true'
          STable2.SCount='true'
          STable2.SDate='true'
          STable2.STime='true'
          STable2.SDownload='true'
  
          ITable1.IPhotos='true'
          ITable1.IProduct='true'
          ITable1.IUPC='true'
          ITable1.IQuantity='true'
          ITable1.ICondition='false'
          ITable1.ILocation='true'
          ITable1.IDate='true'
          ITable1.IDescription='true'
  
          ITable2.IPhotos='true'
          ITable2.IProduct='true'
          ITable2.IUPC='true'
          ITable2.IQuantity='true'
          ITable2.ICondition='true'
          ITable2.ILocation='true'
          ITable2.IDate='true'
          ITable2.IDescription='true'
  
  updateValue('STable1',STable1);
  updateValue('STable2',STable2);
  
 updateValue('ITable1',ITable1);
 updateValue('ITable2',ITable2);
  
  initializeCookie();
  return;
  
      }
     function initializeCookie()
    {
        setCookie('S1Mission','true');
        setCookie("S1Structure",'true')
        setCookie("S1Count",'true')
        setCookie("S1Date",'true')
        setCookie("S1Time",'true')
        setCookie("S1Download",'true')

        setCookie('S2Mission','true');
        setCookie("S2Structure",'true')
        setCookie("S2Count",'true')
        setCookie("S2Date",'true')
        setCookie("S2Time",'true')
        setCookie("S2Download",'true')
        
        setCookie("I1Photos",'true')
        setCookie("I1Product",'true')
        setCookie("I1UPC",'true')
        setCookie("I1Quantity",'true')
        setCookie("I1Condition",'true')
        setCookie("I1Location",'true')
        setCookie("I1Date",'true')
        setCookie("I1Description",'true')

        setCookie("I2Photos",'true')
        setCookie("I2Product",'true')
        setCookie("I2UPC",'true')
        setCookie("I2Quantity",'true')
        setCookie("I2Condition",'true')
        setCookie("I2Location",'true')
        setCookie("I2Date",'true')
        setCookie("I2Description",'true')
return;

    }
   function setCookie(cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (10*365*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
    function  getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
    


      export {
        GetCookieTable,Initialize
      }