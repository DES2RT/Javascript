// =============================================================
//	validOrder() function
// 	called form index.html
//
// this function is called when the submit button from the order
// form is clicked. it calls all the validation functions for the 
// input fields on the form and either displays the appropriate
// error messages or calculates the price of the order and submits
// it to the server
// =============================================================

function validateOrder() {
	
	var errMessages = "";			// initialize for each time the function is called 
	errMessages = validateSurname(errMessages);
	errMessages = validateClient(errMessages);
	errMessages = validatePhone(errMessages);
	errMessages = validateDOB(errMessages);
	errMessages = checkSize(errMessages);
	errMessages = checkCheese(errMessages);
	errMessages = checkSauce(errMessages);
    errMessages = checkToppings(errMessages);


	if(errMessages !== "")	{
		showErrors(errMessages);
		return false;
	}
	else	{
		clearShowErrors();
		calculatePizzaPrice();
		return true;
	}	
}   // end of validateOrder()

// =============================================================
// validateSurname() function
// called from validOrder() function
//
// this function validates the client surname for"
//	- an entry (cannot be blank or blank characters)
//	- a minimum of four characters and maximum of 15
//	- only alphabetic characters (hyphen and apostrophe excepted)
//	- the hyphen or apostrophe cannot be the first or last characters
//		in the string
//	- if a hyphen or apostrophe are present an alphabetic character
//		is before and after
// =============================================================
	
function validateSurname(errMessages)	{
	var nameRules = "<p>In the <b>name</b> field, please enter a minimum of 4 alphabetic characters and a maximum of 15.</p>";
	
	var name = document.getElementById("surname");
	name = name.value.trim();
	var tempName = name.toUpperCase();
	var nameLength = name.length;
    
    if(nameLength === 0)	{
        errMessages += "<p><b>Name: </b> cannot be empty or blank characters only.<br />" + nameRules + "</p>";
        return errMessages;
	}
		
    var j=0;			
	var k=0;
         
    for(var i=0;i<nameLength;i++)	{
			    
	    if(tempName.charAt(0) == "'" || tempName.charAt(nameLength-1) == "'")	{
			errMessages += "<p><b>Apostrophe</b> - if present, must have at least one alphabetic character in front of it and one alphabetic character after it</p>";
			return errMessages;
		} 
   
		if(tempName.charAt(0) == "-" || tempName.charAt(nameLength-1) == "-")	{
		    errMessages += "<p><b>Hyphen</b> - if present must have at least one alphabetic character in front of it and one alphabetic character after it.</p>";
		    return errMessages;
		}
        
        if( (tempName.charCodeAt(i) >= 65) && (tempName.charCodeAt(i) <= 90) )	{
				    j++;
        }
                    
        if( (tempName.charAt(i) == "'") || (tempName.charAt(i) == "-") )    {
                    k++;
        }
	}	// end for loop
 
    if(j<4 || k>1) {
        errMessages += "<p><b>Name</b> must have at least four alphabetic character and cannot have more than one apostrophe or hyphen.</p>";
        return errMessages;
    }
	
	if(name)	{
		if(document.getElementById('client').value == "" || document.getElementById('phone').value == "" || document.getElementById('dob').value == "")
		{
			errMessages += "<p>Please enter valid information for all fields before submitting the form.</p>";
		}
	}
	
	if(!errMessages)	{
		var nameCap = name.charAt(0).toUpperCase() + name.substr(1, name.length-1);
		document.getElementById("surname").value = nameCap;
	}
	
	return errMessages;
}	// end of validateSurname function

// =============================================================
// validateClient() function
// called from validateOrder() function
//
// this functino validates the 'Account No.' field for:
//	- a valid entry (not blank)
//	= the length of the field is not greater than 12
//	- the first three numbers are correct as specified
//	- the sum of numbers 3, 4, 5 and 6 are greater than the 
// 		sum of numbers 9, 10, 11, and 12
//	= the proper format of the client no
// =============================================================

function validateClient(errMessages)	{
	var nameRules = "<p><b>Account No.</b> must be 7 digits followed by a hyphen('-') followed by another four digits</p>";
	
	var num = document.getElementById("client");
	num = num.value.trim();
	var numLength = num.length;
	
	if(num == "")	{
		errMessages += "<p><b>Account No.</b> cannot be blank.<br />" + nameRules + "</p>";
		return errMessages;
	}
	
	if(numLength < 12)	{
		errMessages += "<p><b>Account No.</b> must have 12 digits.<br />" + nameRules + "</p>";
		return errMessages;
	}
	
	var pre = num.substr(0, 3);
	
	if(pre != '416' && pre != '647' && pre != '437' && pre != '905' && pre != '289' && pre != '365')	{
		errMessages += "<p><b>Account No.</b> must begin with the digits '416', '647', '437', '905', '289' or '365'.</p>";
		return errMessages;
	}
	
	var nNum = num.substr(3, 4);
	nNumLength = nNum.length;
	var sum1 = 0;
	for(var i=0;i<nNumLength;i++)	{ 

		if( (nNum.charCodeAt(i) >= 48) && (nNum.charCodeAt(i) <= 90) )	{
			sum1 += eval(nNum[i]);
8		} 
		else	{ 
			errMessages += "<p><b>Account No.</b> positions 4, 5, 6 and 7 must be digits.</p>";
			return errMessages;
		}
		
	}	// end for loop

	if(num.charAt(7) != "-")	{
		errMessages += "<p><b>Account No</b> position 8 must be a hyphen ('-').</p>";
		return errMessages;
	}

	var nNum2 = num.substr(8, 4);
	nNumLength2 = nNum2.length;
	var sum2 = 0;
	for(var i=0;i<nNumLength2;i++)	{
		if( (nNum2.charCodeAt(i) >= 48) && (nNum2.charCodeAt(i) <= 90) )	{
			sum2 += eval(nNum2[i]);
		} 
		else	{
			errMessages += "<p><b>Account No</b> positions 9, 10, 11 and 12 must be digits.</p>";
			return errMessages;
		}
	}	// end for loop
	
	if(sum1 <= sum2)	{
		errMessages += "<p><b>Account No</b> the sum of positions 4, 5, 6 and 7 must be greater than the sum of positions 9, 10, 11 and 12</p>";
		return errMessages;
	}
	
	var rule = eval(num[3]) - eval(num[9]);
	if(rule < 0)
		rule *= -1;

	if(rule != num.charAt(2))	{
		errMessages += "<p><b>Account No</b> the number at position 3 must equal the difference between the number at position 4 minus the number at position 10. " + num.charAt(3) + "-" + num.charAt(9) + "=" + rule + " != " + num.charAt(2) + "</p>";
		return errMessages;
	}
	
	if(client)	{
		if(document.getElementById('surname').value == ""|| document.getElementById('phone').value == "" || document.getElementById('dob').value == "")	
		{
			errMessages += "<p>Please enter valid information for all fields before submitting the form.</p>";
			return errMessages;
		}
	}
	
	return errMessages;	
}	// end of validateClient function

// =============================================================
// validatePhone() function
// called from validateOrder() function
//
// this function validate the Phone No field for:
//	- a value (cannot be blank)
//	- digits only
//	- the proper format
// 	- a valid area code
//	- a valid exchange
//	- a valid number
// =============================================================

function validatePhone(errMessages)	{
	var nameRules = "<p><b>Phone No.</b> must contain 12 digits and be in the format ###-###-####.</p>";
	
	var phoneNum = document.getElementById("phone");
	phoneNum = phoneNum.value.trim();
	var phoneLength = phoneNum.length;
	var areaCode = phoneNum.substr(0, 3);
	var exchange = phoneNum.substr(4, 3);
	var num = phoneNum.substr(8, 4);
	
	if(phoneLength === 0 || phoneLength < 12)	{
		errMessages += nameRules;
		return errMessages;	
	}
	
	if(phoneNum.charAt(3) != "-" || phoneNum.charAt(7) != "-")	{
		errMessages += nameRules;
		return errMessages;
	}
	
	for(var i=0; i<areaCode.length; i++)	{
	
		if( (areaCode.charCodeAt(i) >= 48) && (areaCode.charCodeAt(i) <= 90))	{
			// do nothing
		} 
		else	{
			errMessages += "<p><b>Phone No.</b> must only contain numbers seperated with hyphens</p>";
			return errMessages;
		}
		
		if( (exchange.charCodeAt(i) >= 48) && (exchange.charCodeAt(i) <= 90))	{
			// do nothing
		} 
		else	{
			errMessages += "<p><b>Phone No.</b> must only contain numbers seperated with hyphens</p>";
			return errMessages;
		}

	}	// end for loop
	
	for(var i=0; i<num.length; i++)	{
		
		if( (num.charCodeAt(i) >= 48) && (num.charCodeAt(i) <= 90) )	{
			// do nothing
		}
		else	{
			errMessages += "<p><b>Phone No.</b> must only contain numbers seperated with hyphens</p>";
			return errMessages;
		}
	}	// end for loop
	
	if(areaCode == 416 || areaCode == 647 || areaCode == 437 || areaCode == 905 || areaCode == 289 || areaCode == 365)	{
		// do nothing
	}
	else	{
		errMessages += "<p>Invalid area code. Area Code must be '416', '647', '437', '905', '289' or '365'</p>";
		return errMessages;
	}
	 
	if(exchange < 507 && exchange > 759)	{
		errMessages += "<p>The exchange part of the phone no. (###-<mark>###</mark>-####), must be between 507 and 759. It must also be an increment of 7.</p>";
		return errMessages;
	}
	
	var j=0;
	for(var i=507; i<=759; i+=7)	{
		
		if(exchange == i)	{
			j++;
		}
		
	}	// end for loop
	
	if(j === 0)	{
		errMessages += "<p>The exchange part of the phone no. (###-<mark>###</mark>-####), must be between 507 and 759. It must also be an increment of 7</p>";
		return errMessages;
	}
	
	if(num == "0000")	{
		errMessages += "<p>The number part of the phone no. (###-###-<mark>####</mark>, cannot be all zeros.</p>";
		return errMessages;
	}
	
	var account = document.getElementById('client').value;
	var preAccount = account.substr(0, 3);
	
	if(areaCode !== preAccount)	{
		errMessages += "<p><b>Phone No.</b> area code (<mark>###</mark>-###-####), must match the first three digits of the <b>Account No.</b></p>";
	}
	
	if(phone)	{
		if(document.getElementById('surname').value == ""|| document.getElementById('client').value == "" || document.getElementById('dob').value == "")	
		{
			errMessages += "<p>Please enter valid information for all fields before submitting the form.</p>";
			return errMessages;
		}
	}
	
	return errMessages;
	
}	// end of validatePhone function

// =============================================================
// validateDOB() function
// called from: validOrder() function
//
// this function validates the dob field. 
// 	- for 7 digits
//	- for the format mmmyyyy
//	- a valid three letter month abbreviation
//	- the three letter month must be all uppercase or lowercase
//	- the year is numeric and at least 18 years less than current
// =============================================================

function validateDOB(errMessages)	{
	var dobRules = "<p>The <b>DOB</b> field must be 7 characters and in the format mmmyyyy, (m-month, y-year). The month must also be all uppercase or all lowercase letters.</p>";
	
	var dob = document.getElementById("dob");
	dob = dob.value.trim();
	var dobLength = dob.length;	

	var months = [ "jan", "feb", "mar", "apr", "may", "jun","july", "aug", "sep", "oct", "nov", "dec",
					"JAN", "FEB", "MAR", "APR", "MAY", "JUN","JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
	var mLength = months.length;
	
	if(dobLength === 0 || dobLength < 7)	{
		errMessages += nameRules;
		return errMessages; 
	}

	var dobMonth = dob.substr(0, 3);
	var j=0;
	for(var i=0; i<mLength; i++)	{
		if(dobMonth == months[i])	
			j++;
	}	// end for loop

	if(j === 0)	{
		errMessages += "<p>The month portion of the dob field is not a valid month, or is a mix of capital and lowercase letters." + dobRules + "</p>";
		return errMessages;
	}

	var myDate = new Date();
	var myYear = myDate.getFullYear();
	var dobYear = dob.substr(3, 4);
	if(isNaN(dobYear))	{
		errMessages += "<p>The year portion of the dob field is not valid." + dobRules + "</p>";
		return errMessages;
	}
	
	if(dobYear > (myYear - 18))	{
		errMessages += "<p>You must be at least 18 years of age to submit this form. Make sure the year in the dob field is at least 18 years less than current year.</p>";
	}

	if(dob)	{
		if(document.getElementById('surname').value == ""|| document.getElementById('client').value == "" || document.getElementById('phone').value == "")	
		{
			errMessages += "<p>Please enter valid information for all fields before submitting the form.</p>";
			return errMessages;
		}
	}

	return errMessages;
	
}	// end of function

// =================================================================================
// checkSize() function
// called form validateOrder() function
//
// this function validates the pizza crust and size selection list	
//	- for a selection
// if calls the calculatePizzaPrice() function and updates the 'price'
// form field with the price of the pizza size
// =================================================================================

function checkSize(errMessages)	{
	var sizeRules = "<p>One of the 16 pizza size and crust options must be selected.</p>";
    
    // stores the sizecrust element in pizzaSize to determine how many options	
	var pizzaSize = document.getElementById('sizecrust');
    // gets number of options available for pizza size
	var selectLength = pizzaSize.length;
	
	var j=0;
	var option;
    // determines if a selection has been made by incrementing j for each instance
    // of a selection
	for(var i=0; i<selectLength; i++)	{
		if(pizzaSize.options[i].selected)	{
			j++;
			option = pizzaSize.options[i].value;
		}
		else if(pizzaSize.options[0].selected)	{
			j--;
		}
	}
    // if no selection has been made display error message
    if(j<=0)	{
		errMessages += sizeRules;
		return errMessages;
	}
	// if selection has been made but no other fields have been filled
	if(j)	{
		if(document.getElementById('surname').value == "" || document.getElementById('client').value == "" || document.getElementById('phone').value == "" || document.getElementById('dob').value == "")	
		{
			errMessages += "<p>Please enter valid information for all fields before submitting the form.</p>";
			return errMessages;
		}
	}

    // stores the value of the pizza size selected, 1st letter only
	var myOption = option.substr(0, 1);
	if(myOption == "S")	{   // if small selected store price in hPizzaPrice field
		document.onlineOrder.elements['hPizzaPrice'].value = 10.55;
	}
	
	if(myOption == "M")	{   // if medium selected store price in hPizzaPrice field
		document.onlineOrder.elements['hPizzaPrice'].value = 14.25;
	}

	if(myOption == "L")	{   // if large selected store pizza price in hPizzaPrice field
		document.onlineOrder.elements['hPizzaPrice'].value = 21.50;
	}

	if(myOption == "X")	{   // if extra large selected store price in hPizzaPrice field
		document.onlineOrder.elements['hPizzaPrice'].value = 25.00;
	}

	return errMessages;
}	// end checkSize()

// =================================================================================
// checkCheese() function
// called form validateOrder() function
//
// this function validates the cheese radio buttons for a selection
// =================================================================================

function checkCheese(errMessages)	{
	var cheeseRules = "<p>A cheese must be selected.</p>";
	
	var cheeseLength = document.onlineOrder.cheese.length;
	var j=0;
	for(var i=0; i<cheeseLength; i++)	{
		if(document.onlineOrder.cheese[i].checked)	{
			j++;
		}
	}	// end for loop
	
	if(j === 0)	{
		errMessages += cheeseRules;
		return errMessages;
	}
	else if(document.getElementById('surname').value == "" || document.getElementById('client').value == "" || document.getElementById('phone').value == "" || document.getElementById('dob').value == "")	
	{
		errMessages += "<p>Please enter valid information for all fields before submitting the form.</p>";
		return errMessages;
	}

	return errMessages;

}	// end checkCheese() function

// =================================================================================
// checkSauce() function
// called from validateOrder() function
//
// this function validates the sauce radio buttons for a selection
// =================================================================================

function checkSauce(errMessages)	{
	var sauceRules = "<p>A sauce must be selected.</p>";
	
	var sauceLength = document.onlineOrder.sauce.length;
	var j=0;
	for(var i=0; i<sauceLength; i++)	{
		if(document.onlineOrder.sauce[i].checked)	{
			j++;
		}
	
	}
	
	if(j === 0)	{
		errMessages += sauceRules;
		return errMessages;
	}
	
	return errMessages;
}	// end checkSauce() function

// =================================================================================
// checkToppings() function
// called from validateOrder() function
//
// this function calculates the price of all toppings selected and stores it
// in the hfield
// =================================================================================

function checkToppings(errMessages)	{
	var toppingsRule = "<p>Toppings are optional. Choose up to 12 toppings.</p>";
    
    // stores the number of options in the list	
	var toppingCount = document.onlineOrder.toppings.length;
	var pTops=0;
    // counts the number of toppings selected by increasing pTops for every topping selected
	for(var i=0; i<toppingCount; i++)	{   
		if(document.onlineOrder.toppings[i].checked)
			pTops++;
	}
	document.getElementById('price').value = "$ " + (pTops*1.89);
    // stores the number of toppings selected in hToppings field
	document.onlineOrder.elements['hToppings'].value = pTops;

   /* 
    var pPrice = document.onlineOrder.elements['hPizzaPrice'].value;
	var dOrder = document.getElementById('doubleOrder').checked;
	var doubleit;
	if(dOrder == true)	{
		doubleit = 2;
	}
	else	{
		doubleit = 1;
	}
	document.onlineOrder.elements['hDouble'].value = doubleit;
	
	var cTops = 0;
	var subTotal;
	if(pTops == 0)	{
		subTotal = pPrice * doubleit;
		document.getElementById('price').value = "$ " + subTotal.toFixed(2);
	}
	else	{
		cTops = (pTops * 1.89) * doubleit;
		if(doubleit == 1)	{
		    subTotal = pPrice*1 + cTops*1;
			document.getElementById('price').value = "$ " + subTotal.toFixed(2);
		}
		else {
			subTotal = (pPrice *1 + cTops *1) * 0.85;
			document.getElementById('price').value = "$ " + subTotal.toFixed(2);
		}

	}
	document.onlineOrder.elements['hToppingsCost'].value = cTops;
	document.onlineOrder.elements['hSubTotal'].value = subTotal;
*/
	return errMessages;
}	// end of checkToppings() function

// =================================================================================
// showErrors() function
// called from validateOrder() function
//
// this function shows and error messages int the errors div field of the form
// =================================================================================

function showErrors(errMessages)	{
	document.getElementById('errors').innerHTML = errMessages;
}	// end of showErrors 

// =================================================================================
// clearShowErrors() function	
// called form validateOrder() functino
//
// this function clears any error messages that may be in the errors div
// of the form field
// =================================================================================

function clearShowErrors()	{
	document.getElementById('errors	').innerHTML = "";
	document.getElementById('client').focus();
}	// end of clearShowErrors

// =================================================================================
// calculatePizzaPrice() function
//
// called from: 	validateOrder()
// this function is called
//	- when no errors are found on the form
//	- when selections are made to the pizza
//		- the crust size is selected or changed
//		- the toppings are selected or deselected
//		- the 'double your order' checkbox is selected or deselected
//	- and updates the hidden form elements, as well as the 'price' field
// =================================================================================

function calculatePizzaPrice()	{
    var dOrder = document.getElementById('doubleOrder').checked;
	var doubleit;
	var toppingCount = document.onlineOrder.toppings.length;
    var pTops = 0;
    var cTops = 0;
    var tax = 0.13;
    var subTotal = 0;
    var pTotal = 0;

    // calculate the price of the pizza based on size of crust. 
	var pPrice;
	var pCrust = document.getElementById('sizecrust');
	var myOption = pCrust.options[pCrust.selectedIndex].value;
    var crustSize = myOption.substr(0, 1);	
    
    if(crustSize == "S")
		pPrice = 10.55;
	if(crustSize == "M")	
		pPrice = 14.25;
	if(crustSize == "L")
		pPrice = 21.50;
	if(crustSize == "X")
		pPrice = 25.00
	// stores price of pizza in the hPizzaPrice field and displays the price of the
    // pizza size in the 'price' field of the form
    document.onlineOrder.elements['hPizzaPrice'].value = pPrice.toFixed(2);
    document.getElementById('price').value = "$ " + pPrice.toFixed(2);	
    // determines if double order checkbox has been checked and calculates price of pizza
	if(dOrder == true)	{
		doubleit = 2;
		pPrice *= doubleit;
	}
	else	{
		doubleit = 1;
	}
    // stores double order status in hDouble field and displays the price of the
    // pizza on the form
    document.onlineOrder.elements['hDouble'].value = doubleit;
	document.getElementById('price').value = "$ " + pPrice.toFixed(2);
	
    // counts the number of toppings that have been selected
	for(var i=0; i<toppingCount; i++)	{
		if(document.onlineOrder.toppings[i].checked)
			pTops++;
	} 
    // stores the number of toppings selected in hToppings field
	document.onlineOrder.elements['hToppings'].value = pTops;
   
    // calculates the cost of the pizza toppings
    if(pTops == 0)
        cTops = 0;
    else
        cTops = (pTops * 1.89) * doubleit;
    
    // stores the price of the toppings in the hToppingsCost field
    document.onlineOrder.elements['hToppingsCost'].value = cTops;
    
    // calculates the subtotal
    subTotal = pPrice + cTops;
    // stores the subtotal in the hSubTotal field and displays the subtotal on the form
    document.onlineOrder.elements['hSubTotal'].value = subTotal.toFixed(2);
    document.getElementById('price').value = "$ " + subTotal.toFixed(2);

    document.onlineOrder.elements['hHst'].value = (subTotal*tax).toFixed(2);
    // calculates the total of the pizze including tax 1.13
	pTotal = (subTotal * tax) + subTotal;	
    // stores total price of pizza in the hFinalTotal field and displays the price
    // on the form
	document.onlineOrder.elements['hFinalTotal'].value = pTotal.toFixed(2);
	document.getElementById('price').value = "$ " + pTotal.toFixed(2);
	
}	// end of calculatePizzaPrice function

