
export function formatXml(xml: any) {
    var space: number = 0;
    var back: boolean = false;
    if (xml === undefined)
      return;
    
    xml = xml.replace(/(>)\s+/g, ">");
    xml = xml.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3');
    xml = xml.split('\n');
    
    for (var i = 0; i < xml.length; i++) {
      xml[i] = xml[i].trim();
      if (xml[i].substring(0,2) === '</') {
        back = true;
        space -= 2;
      } else {
        back = false;
        if ((i !== 0) && !xml[(i - 1)].includes('</', 2)) {
          if (xml[i - 1].substring(0,2) === '<?' || xml[i - 1].includes('/>'))  {
            back = true;
          } 
          else {
            space += 2;
          }
        }
      }

      var spaces = "";
      for (var x = 0; x < space; x++)
        spaces = spaces + " ";

      xml[i] = spaces + xml[i];
    }

    var xmlString = "";
    for (i = 0; i < xml.length; i++) {
      xmlString = xmlString + xml[i] + '\n';
    }
    return xmlString;
  };

export function formatFlight(xml: any) {
    var space: number = 0;
    var back: boolean = false;
    if (xml === undefined)
      return;

    var xmlString = JSON.stringify(xml);
    xmlString = xmlString.replace(/({)/g, "\r\n  {");
    xmlString = xmlString.replace(/(,)/g, ",\r\n");
    console.log(xmlString);
    // xml = xml.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3');
    // xml = xml.split('\n');
    
    // for (var i = 0; i < xml.length; i++) {
    //   xml[i] = xml[i].trim();
    //   if (xml[i].substring(0,2) === '</') {
    //     back = true;
    //     space -= 2;
    //   } else {
    //     back = false;
    //     if ((i !== 0) && !xml[(i - 1)].includes('</', 2)) {
    //       if (xml[i - 1].substring(0,2) === '<?' || xml[i - 1].includes('/>'))  {
    //         back = true;
    //       } 
    //       else {
    //         space += 2;
    //       }
    //     }
    //   }

    //   var spaces = "";
    //   for (var x = 0; x < space; x++)
    //     spaces = spaces + " ";

    //   xml[i] = spaces + xml[i];
    // }

    // var xmlString = "";
    // for (i = 0; i < xml.length; i++) {
    //   xmlString = xmlString + xml[i] + '\n';
    // }
    // return xmlString;
    return xmlString;
  };