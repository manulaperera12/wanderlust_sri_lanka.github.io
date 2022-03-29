            var sl = 0;

            //get element by id alias
            var $$ = function(id){
                return document.getElementById(id);
            }

            var bind = function(src, dest, e){
                try{
                    $$(dest).innerHTML = src.value;
                }
                catch(e){
                    console.log(e, src, dest);
                }
                src.addEventListener(e, function(){
                    try{
                        $$(dest).innerHTML = src.value;
                    }catch(e){};
                });
            };

            var register = function(ele, e, func){
                $$(ele).addEventListener(e,function(){window[func]();});
            }

            function bind_all_text_boxes(){
                var items = document.getElementsByTagName('INPUT');
                for(var i = items.length - 1; i >= 0; i--){
                    var item = items[i];
                    var destination_field = item.id + '_D';
                    bind(item, destination_field, 'keyup');
                }
            }

            function add_line_item_binds(){
                for (var i=1; i<=sl; i++){
                    register('item_rate_'+i, 'keyup', 'update_totals');
                    register('item_units_'+i, 'keyup', 'update_totals');
                }
            }

            function update_totals(){
                total_no_of_units = 0;
                sub_total = 0;
                grand_total = 0;
                for (var i=1; i<=sl; i++){
                    var no_of_units = parseFloat($$('item_units_'+i).value);
                    var unit_rate = parseFloat($$('item_rate_'+i).value);
                    var cost = no_of_units * unit_rate;

                    $$('item_total_'+i+'_D').innerHTML = cost;

                    total_no_of_units = total_no_of_units + no_of_units;
                    sub_total = sub_total + cost;
                }

                $$('total_units_D').innerHTML = total_no_of_units;
                $$('sub_total_D').innerHTML = sub_total;

                grand_total = sub_total + tax_amount + parseFloat($$('other_charges').value) - parseFloat($$('discount').value);
                $$('grand_total_D').innerHTML = grand_total = Math.round(grand_total * 100) / 100;
				
            }
			
			document.getElementById("vendor_name").disabled = true;
			document.getElementById("vendor_address").disabled = true;
			document.getElementById("vendor_city").disabled = true;
			document.getElementById("vendor_state").disabled = true;
			document.getElementById("vendor_zip_value").disabled = true;
			document.getElementById("vendor_phone").disabled = true;
			document.getElementById("vendor_email").disabled = true;
			document.getElementById("vendor_website").disabled = true;
			document.getElementById("vendor_cid").disabled = true;
			document.getElementById("vendor_cid_value").disabled = true;

            function observe_tax_changes(){
                if($$('tax_rate').value){
                    if($$('tax_row').innerHTML == ''){
                        $$('tax_row').innerHTML = '<td align="left">Tax@<span id="tax_rate_D"></span>% (+)</td><td align="left">:</td><td align="left"><span id="currency_D">$ </span></span><span id="tax_amount_D"></span></td>';
                    }
                    tax_amount = sub_total * parseFloat($$('tax_rate').value) / 100;
                    $$('tax_amount_D').innerHTML = tax_amount;
                }
                else{
                    tax_amount = 0;
                    $$('tax_row').innerHTML = '';
                }
                update_totals();
            }

            function add_a_line_item(){
                var order_items = $$('order_items');
                var order_items_D = $$('order_items_D');

                sl = sl + 1;
                var input = document.createElement('input');
                input.type = 'text';
                input.id = 'item_desc_'+sl;
                input.placeholder = 'Description';
                input.value = 'T-Shirt';
                order_items.appendChild(input);

                input = document.createElement('input');
                input.type = 'text';
                input.classList = ['input_small'];
                input.id = 'item_rate_'+sl;
                input.min = 1;
                input.placeholder = 'Rate per Unit';
                input.value = '13.99';
                order_items.appendChild(input);

                input = document.createElement('input');
                input.type = 'text';
                input.classList = ['input_small'];
                input.id = 'item_units_'+sl;
                input.min = 1;
                input.placeholder = 'No. of Units';
                input.value = '1';
                order_items.appendChild(input);

                order_items_D.innerHTML = order_items_D.innerHTML + '<tr align="center"><td id="item_sl_'+sl+'_D">'+sl+'</td><td id="item_desc_'+sl+'_D"></td><td id="item_rate_'+sl+'_D"></td><td id="item_units_'+sl+'_D"></td><td id="item_total_'+sl+'_D"></td></tr>';

                bind_all_text_boxes();
                update_totals();
                add_line_item_binds();
            }

            function set_defaults(){
                var now = new Date();

                //set date
                var month = now.getMonth() + 1;
                var date = now.getDate();
                var hour = now.getHours();
                now.mm = month<10 ? '0'+month : month;
                now.dd = date<10 ? '0'+date : date;
                now.hh = hour<10 ? '0'+hour : hour;
                $$('invoice_date').value = now.toDateString();
                
                //set invoice number
                invoice_number = '' + now.getFullYear() + now.mm + now.dd + now.hh + '-' + now.getMinutes();
                $$('invoice_number').value = invoice_number;

                //bind add_item_button
                register('add_new_item_button', 'click', 'add_a_line_item');

                //bind tax_rate observer
                tax_amount = 0;
                register('tax_rate', 'keyup', 'observe_tax_changes');

                //bind other charges and discount to update totals
                register('other_charges', 'keyup', 'update_totals');
                register('discount', 'keyup', 'update_totals');
            }

            set_defaults();
            add_a_line_item(); //binding of text boxes happens inside this func
            observe_tax_changes();
            update_totals();

            JsBarcode("#bar_code_container", invoice_number, {
                height: 40,
                displayValue: false
            });