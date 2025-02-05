document.addEventListener('DOMContentLoaded', () => {
    const serviceSelect = document.getElementById('serviceSelect');
    const serviceOptions = document.getElementById('serviceOptions');
    const totalPriceDisplay = document.getElementById('totalPrice');
    const priceBreakdownDisplay = document.getElementById('priceBreakdown');
    // Detailed Service Templates
    const serviceTemplates = {
        digitalPrinting: `
            <h3>Digital Printing Options</h3>
            <label for="size">Size:</label>
            <select id="size">
                <option value="A4_bw">A4 - Black & White (PHP 8)</option>
                <option value="A4_color">A4 - Colored (PHP 15)</option>
                <option value="A3_bw">A3 - Black & White (PHP 15)</option>
                <option value="A3_color">A3 - Colored (PHP 25)</option>
                <option value="LEGAL_bw">Legal - Black & White (PHP 10)</option>
                <option value="LEGAL_color">Legal - Colored (PHP 18)</option>
                <option value="OTHER">Other - Custom Pricing</option>
            </select>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" min="1" value="1">
            <label for="paperType">Paper Type:</label>
            <select id="paperType">
                <option value="bondpaper">Bond Paper (Free)</option>
                <option value="glossy">Glossy (+PHP 5)</option>
                <option value="photoPaper">Photo Paper (+PHP 10)</option>
                <option value="matte">Matte (+PHP 5)</option>
            </select>
            <label for="printQuality">Print Quality:</label>
            <select id="printQuality">
                <option value="standard">Standard (Base Price)</option>
                <option value="highResolution">High Resolution (+PHP 3)</option>
            </select>
            <label for="lamination">Lamination:</label>
            <select id="lamination">
                <option value="no">No (PHP 0)</option>
                <option value="yes">Yes (+PHP 15)</option>
            </select>
        `,
        silkScreen: `
            <h3>Silk Screen Printing Options</h3>
            <label for="size">Size:</label>
            <select id="size">
                <option value="small">Small (PHP 50)</option>
                <option value="medium">Medium (PHP 80)</option>
                <option value="large">Large (PHP 120)</option>
            </select>
            <label for="material">Material:</label>
            <select id="material">
                <option value="cotton">Cotton (Base Price)</option>
                <option value="polyester">Polyester (+PHP 10)</option>
                <option value="canvas">Canvas (+PHP 20)</option>
            </select>
            <label for="colors">Number of Colors:</label>
            <select id="colors">
                <option value="single">Single Color (Base Price)</option>
                <option value="multi">Multi-color (+PHP 30 per additional color)</option>
            </select>
            <label for="printArea">Print Area:</label>
            <select id="printArea">
                <option value="standard">Front/Back/Sleeves (Included)</option>
                <option value="additional">Additional Area (+PHP 20)</option>
            </select>
        `,
        sublimation: `
            <h3>Sublimation Printing Options</h3>
            <label for="size">Size/Product:</label>
            <select id="size">
                <option value="A4">A4 Print (PHP 100)</option>
                <option value="A3">A3 Print (PHP 150)</option>
                <option value="shirt">Shirt (Base Price)</option>
                <option value="jersey">Jersey (+PHP 20)</option>
                <option value="mug">Mug (PHP 180)</option>
                <option value="mousePad">Mouse Pad (PHP 120)</option>
            </select>
            <label for="colorOption">Color Option:</label>
            <select id="colorOption">
                <option value="fullColor">Full Color</option>
                <option value="bw">Black & White (-PHP 20)</option>
            </select>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" min="1" value="1">
        `,
        umbrella: `
            <h3>Umbrella Printing Options</h3>
            <label for="type">Umbrella Type:</label>
            <select id="type">
                <option value="foldable">Foldable (PHP 200)</option>
                <option value="transparent">Transparent (PHP 250)</option>
                <option value="golf">Golf (PHP 300)</option>
            </select>
            <label for="printingStyle">Printing Style:</label>
            <select id="printingStyle">
                <option value="single">Single Panel (Base Price)</option>
                <option value="full">Full Panel (+PHP 50)</option>
                <option value="multi">Multi-Panel (+PHP 80)</option>
            </select>
            <label for="colors">Color Options:</label>
            <select id="colors">
                <option value="single">Single Color (Base Price)</option>
                <option value="multi">Multi-color (+PHP 30 per color)</option>
            </select>
        `,
        bags: `
            <h3>Bags / Canvas Printing</h3>
            <label for="type">Bag Type:</label>
            <select id="type">
                <option value="tote">Tote Bag (PHP 150)</option>
                <option value="drawstring">Drawstring (PHP 120)</option>
            </select>
            <label for="printArea">Print Area:</label>
            <select id="printArea">
                <option value="standard">Front/Back (Base Price)</option>
                <option value="full">Full Bag (+PHP 40)</option>
            </select>
            <label for="designType">Design Type:</label>
            <select id="designType">
                <option value="color">Color (Base Price)</option>
                <option value="bw">Black & White (-PHP 20)</option>
            </select>
        `,
        mugs: `
            <h3>Mugs & Magic Mugs Printing</h3>
            <label for="type">Mug Type:</label>
            <select id="type">
                <option value="regular">Regular Mug (PHP 150)</option>
                <option value="magic">Magic Mug (PHP 220)</option>
            </select>
            <label for="printArea">Print Area:</label>
            <select id="printArea">
                <option value="oneSide">One Side (Base Price)</option>
                <option value="bothSides">Both Sides (+PHP 30)</option>
                <option value="wrapAround">Wrap-around (+PHP 50)</option>
            </select>
            <label for="colorOption">Color Option:</label>
            <select id="colorOption">
                <option value="fullColor">Full Color</option>
                <option value="bw">Black & White (-PHP 20)</option>
            </select>
        `,
        lanyard: `
            <h3>Lanyard Printing</h3>
            <label for="type">Lanyard Type:</label>
            <select id="type">
                <option value="sublimated">Sublimated (PHP 50)</option>
                <option value="screenPrinted">Screen Printed (PHP 40)</option>
                <option value="woven">Woven (PHP 60)</option>
                <option value="plain">Plain (PHP 30)</option>
            </select>
            <label for="width">Width:</label>
            <select id="width">
                <option value="10mm">10mm (Base Price)</option>
                <option value="15mm">15mm (+PHP 5)</option>
                <option value="20mm">20mm (+PHP 10)</option>
            </select>
            <label for="attachment">Attachment Type:</label>
            <select id="attachment">
                <option value="metal">Metal Hook (Base Price)</option>
                <option value="plastic">Plastic Hook (-PHP 5)</option>
                <option value="badgeReel">Badge Reel (+PHP 10)</option>
            </select>
            <label for="colors">Color Options:</label>
            <select id="colors">
                <option value="single">Single Color (Base Price)</option>
                <option value="multi">Multi-color (+PHP 10)</option>
            </select>
        `,
        pvcId: `
            <h3>PVC ID Printing</h3>
            <label for="size">ID Size:</label>
            <select id="size">
                <option value="standard">Standard (PHP 80)</option>
                <option value="custom">Custom (+PHP 20)</option>
            </select>
            <label for="materialType">Material Type:</label>
            <select id="materialType">
                <option value="pvc">PVC (Base Price)</option>
                <option value="laminatedPaper">Laminated Paper (-PHP 20)</option>
            </select>
            <label for="laminationType">Lamination Type:</label>
            <select id="laminationType">
                <option value="glossy">Glossy</option>
                <option value="matte">Matte</option>
            </select>
            <label for="holePunch">Hole Punch:</label>
            <select id="holePunch">
                <option value="no">No</option>
                <option value="yes">Yes (+PHP 5)</option>
            </select>
        `,
        pisoPrint: `
            <h3>Piso Print</h3>
            <label for="size">Size:</label>
            <select id="size">
                <option value="A4">A4 (PHP 1)</option>
                <option value="A3">A3 (PHP 2)</option>
                <option value="LEGAL">Legal (PHP 1.50)</option>
            </select>
            <label for="paperType">Paper Type:</label>
            <select id="paperType">
                <option value="bondpaper">Bondpaper (Included)</option>
                <option value="glossy">Glossy/Photo Paper (+PHP 5)</option>
            </select>
            <label for="colorOption">Color Option:</label>
            <select id="colorOption">
                <option value="bw">Black & White (Base Price)</option>
                <option value="color">Colored (PHP 5)</option>
            </select>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" min="1" value="1">
        `,
        typingJob: `
            <h3>Typing Job</h3>
            <label for="documentType">Document Type:</label>
            <select id="documentType">
                <option value="standard">Reports/Resumes/Forms (PHP 20 per page)</option>
            </select>
            <label for="formatting">Formatting:</label>
            <select id="formatting">
                <option value="no">Without Formatting (Base Price)</option>
                <option value="yes">With Formatting (+PHP 10 per page)</option>
            </select>
            <label for="quantity">Number of Pages:</label>
            <input type="number" id="quantity" min="1" value="1">
        `,
        tshirtPrint: `
            <h3>T-Shirt Printing</h3>
            <label for="size">T-Shirt Size:</label>
            <select id="size">
                <option value="standard">XS to XL (PHP 200)</option>
                <option value="xxl">XXL (+PHP 30)</option>
            </select>
            <label for="material">Material Type:</label>
            <select id="material">
                <option value="cotton">Cotton (Base Price)</option>
                <option value="polyester">Polyester/Dri-Fit (+PHP 20)</option>
            </select>
            <label for="printMethod">Printing Method:</label>
            <select id="printMethod">
                <option value="silkScreen">Silk Screen (Base Price)</option>
                <option value="sublimation">Sublimation (+PHP 30)</option>
                <option value="heatTransfer">Heat Transfer (+PHP 40)</option>
                <option value="dtg">DTG (+PHP 50)</option>
            </select>
            <label for="printArea">Design Placement:</label>
            <select id="printArea">
                <option value="standard">Front/Back/Sleeves (Included)</option>
                <option value="fullPrint">Full Print (+PHP 70)</option>
            </select>
            <label for="colors">Color Options:</label>
            <select id="colors">
                <option value="single">Single Color (Base Price)</option>
                <option value="multi">Multi-color (+PHP 30 per color)</option>
            </select>
        `
    };

    const pricingCalculators = {
        digitalPrinting: () => {
            const size = document.getElementById('size').value;
            const quantity = parseInt(document.getElementById('quantity').value);
            const paperType = document.getElementById('paperType').value;
            const printQuality = document.getElementById('printQuality').value;
            const lamination = document.getElementById('lamination').value;
    
            const sizePrice = {
                'A4_bw': 8, 'A4_color': 15,
                'A3_bw': 15, 'A3_color': 25,
                'LEGAL_bw': 10, 'LEGAL_color': 18
            }[size] || 0;
    
            const paperPrice = {
                'bondpaper': 0, 'glossy': 5,
                'photoPaper': 10, 'matte': 5
            }[paperType] || 0;
    
            const qualityPrice = (printQuality === 'highResolution') ? 3 : 0;
            const laminationPrice = (lamination === 'yes') ? 15 : 0;
    
            const total = (sizePrice + paperPrice + qualityPrice + laminationPrice) * quantity;
            const breakdown = [
                `Size: PHP ${sizePrice * quantity}`,
                `Paper Type: PHP ${paperPrice * quantity}`,
                `Print Quality: PHP ${qualityPrice * quantity}`,
                `Lamination: PHP ${laminationPrice * quantity}`
            ];
    
            return { total, breakdown };
        },
        silkScreen: () => {
            const size = document.getElementById('size').value;
            const material = document.getElementById('material').value;
            const colors = document.getElementById('colors').value;
            const printArea = document.getElementById('printArea').value;
    
            const sizePrice = {
                'small': 50, 'medium': 80, 'large': 120
            }[size] || 0;
    
            const materialPrice = {
                'cotton': 0, 'polyester': 10, 'canvas': 20
            }[material] || 0;
    
            const colorPrice = (colors === 'multi') ? 30 : 0;
            const printAreaPrice = (printArea === 'additional') ? 20 : 0;
    
            const total = sizePrice + materialPrice + colorPrice + printAreaPrice;
            const breakdown = [
                `Size: PHP ${sizePrice}`,
                `Material: PHP ${materialPrice}`,
                `Colors: PHP ${colorPrice}`,
                `Print Area: PHP ${printAreaPrice}`
            ];
    
            return { total, breakdown };
        },
        sublimation: () => {
            const size = document.getElementById('size').value;
            const colorOption = document.getElementById('colorOption').value;
            const quantity = parseInt(document.getElementById('quantity').value);
    
            const sizePrice = {
                'A4': 100, 'A3': 150,
                'shirt': 0, 'jersey': 20,
                'mug': 180, 'mousePad': 120
            }[size] || 0;
    
            const colorDiscount = (colorOption === 'bw') ? -20 : 0;
    
            const total = (sizePrice + colorDiscount) * quantity;
            const breakdown = [
                `Size/Product: PHP ${sizePrice * quantity}`,
                `Color Option: PHP ${colorDiscount * quantity}`
            ];
    
            return { total, breakdown };
        },
        umbrella: () => {
            const type = document.getElementById('type').value;
            const printingStyle = document.getElementById('printingStyle').value;
            const colors = document.getElementById('colors').value;
    
            const typePrice = {
                'foldable': 200, 'transparent': 250, 'golf': 300
            }[type] || 0;
    
            const printingStylePrice = {
                'single': 0, 'full': 50, 'multi': 80
            }[printingStyle] || 0;
    
            const colorPrice = (colors === 'multi') ? 30 : 0;
    
            const total = typePrice + printingStylePrice + colorPrice;
            const breakdown = [
                `Umbrella Type: PHP ${typePrice}`,
                `Printing Style: PHP ${printingStylePrice}`,
                `Color Options: PHP ${colorPrice}`
            ];
    
            return { total, breakdown };
        },
        bags: () => {
            const type = document.getElementById('type').value;
            const printArea = document.getElementById('printArea').value;
            const designType = document.getElementById('designType').value;
    
            const typePrice = {
                'tote': 150, 'drawstring': 120
            }[type] || 0;
    
            const printAreaPrice = (printArea === 'full') ? 40 : 0;
            const designTypeDiscount = (designType === 'bw') ? -20 : 0;
    
            const total = typePrice + printAreaPrice + designTypeDiscount;
            const breakdown = [
                `Bag Type: PHP ${typePrice}`,
                `Print Area: PHP ${printAreaPrice}`,
                `Design Type: PHP ${designTypeDiscount}`
            ];
    
            return { total, breakdown };
        },
        mugs: () => {
            const type = document.getElementById('type').value;
            const printArea = document.getElementById('printArea').value;
            const colorOption = document.getElementById('colorOption').value;
    
            const typePrice = {
                'regular': 150, 'magic': 220
            }[type] || 0;
    
            const printAreaPrice = {
                'oneSide': 0, 'bothSides': 30, 'wrapAround': 50
            }[printArea] || 0;
    
            const colorDiscount = (colorOption === 'bw') ? -20 : 0;
    
            const total = typePrice + printAreaPrice + colorDiscount;
            const breakdown = [
                `Mug Type: PHP ${typePrice}`,
                `Print Area: PHP ${printAreaPrice}`,
                `Color Option: PHP ${colorDiscount}`
            ];
    
            return { total, breakdown };
        },
        lanyard: () => {
            const type = document.getElementById('type').value;
            const width = document.getElementById('width').value;
            const attachment = document.getElementById('attachment').value;
            const colors = document.getElementById('colors').value;
    
            const typePrice = {
                'sublimated': 50, 'screenPrinted': 40,
                'woven': 60, 'plain': 30
            }[type] || 0;
    
            const widthPrice = {
                '10mm': 0, '15mm': 5, '20mm': 10
            }[width] || 0;
    
            const attachmentPrice = {
                'metal': 0, 'plastic': -5, 'badgeReel': 10
            }[attachment] || 0;
    
            const colorPrice = (colors === 'multi') ? 10 : 0;
    
            const total = typePrice + widthPrice + attachmentPrice + colorPrice;
            const breakdown = [
                `Lanyard Type: PHP ${typePrice}`,
                `Width: PHP ${widthPrice}`,
                `Attachment Type: PHP ${attachmentPrice}`,
                `Color Options: PHP ${colorPrice}`
            ];
    
            return { total, breakdown };
        },
        pvcId: () => {
            const size = document.getElementById('size').value;
            const materialType = document.getElementById('materialType').value;
            const holePunch = document.getElementById('holePunch').value;
    
            const sizePrice = {
                'standard': 80, 'custom': 20
            }[size] || 0;
    
            const materialTypeDiscount = (materialType === 'laminatedPaper') ? -20 : 0;
            const holePunchPrice = (holePunch === 'yes') ? 5 : 0;
    
            const total = sizePrice + materialTypeDiscount + holePunchPrice;
            const breakdown = [
                `ID Size: PHP ${sizePrice}`,
                `Material Type: PHP ${materialTypeDiscount}`,
                `Hole Punch: PHP ${holePunchPrice}`
            ];
    
            return { total, breakdown };
        },
        pisoPrint: () => {
            const size = document.getElementById('size').value;
            const paperType = document.getElementById('paperType').value;
            const colorOption = document.getElementById('colorOption').value;
            const quantity = parseInt(document.getElementById('quantity').value);
    
            const sizePrice = {
                'A4': 1, 'A3': 2, 'LEGAL': 1.50
            }[size] || 0;
    
            const paperTypePrice = (paperType === 'glossy') ? 5 : 0;
            const colorOptionPrice = (colorOption === 'color') ? 5 : 0;
    
            const total = (sizePrice + paperTypePrice + colorOptionPrice) * quantity;
            const breakdown = [
                `Size: PHP ${sizePrice * quantity}`,
                `Paper Type: PHP ${paperTypePrice * quantity}`,
                `Color Option: PHP ${colorOptionPrice * quantity}`
            ];
    
            return { total, breakdown };
        },
        typingJob: () => {
            const documentType = document.getElementById('documentType').value;
            const formatting = document.getElementById('formatting').value;
            const quantity = parseInt(document.getElementById('quantity').value);
    
            const documentTypePrice = 20;
            const formattingPrice = (formatting === 'yes') ? 10 : 0;
    
            const total = (documentTypePrice + formattingPrice) * quantity;
            const breakdown = [
                `Document Type: PHP ${documentTypePrice * quantity}`,
                `Formatting: PHP ${formattingPrice * quantity}`
            ];
    
            return { total, breakdown };
        },
        tshirtPrint: () => {
            const size = document.getElementById('size').value;
            const material = document.getElementById('material').value;
            const printMethod = document.getElementById('printMethod').value;
            const printArea = document.getElementById('printArea').value;
            const colors = document.getElementById('colors').value;
    
            const sizePrice = {
                'standard': 200, 'xxl': 30
            }[size] || 0;
    
            const materialPrice = (material === 'polyester') ? 20 : 0;
            const printMethodPrice = {
                'silkScreen': 0, 'sublimation': 30,
                'heatTransfer': 40, 'dtg': 50
            }[printMethod] || 0;
    
            const printAreaPrice = (printArea === 'fullPrint') ? 70 : 0;
            const colorPrice = (colors === 'multi') ? 30 : 0;
    
            const total = sizePrice + materialPrice + printMethodPrice + printAreaPrice + colorPrice;
            const breakdown = [
                `T-Shirt Size: PHP ${sizePrice}`,
                `Material Type: PHP ${materialPrice}`,
                `Printing Method: PHP ${printMethodPrice}`,
                `Design Placement: PHP ${printAreaPrice}`,
                `Color Options: PHP ${colorPrice}`
            ];
    
            return { total, breakdown };
        }
    };

        // Dynamic service options rendering
        serviceSelect.addEventListener('change', (e) => {
            const selectedService = e.target.value;
            
            // Clear previous service options
            serviceOptions.innerHTML = '';
            
            if (selectedService && serviceTemplates[selectedService]) {
                // Render new service options template
                serviceOptions.innerHTML = serviceTemplates[selectedService];
                
                // Add event listeners to update price
                const optionElements = serviceOptions.querySelectorAll('select, input');
                optionElements.forEach(el => {
                    el.addEventListener('change', calculateTotalPrice);
                    el.addEventListener('input', calculateTotalPrice);
                });
                
                // Initial price calculation
                calculateTotalPrice();
            }
        });
    
        function calculateTotalPrice() {
            const selectedService = serviceSelect.value;
            
            if (selectedService && pricingCalculators[selectedService]) {
                const { total, breakdown } = pricingCalculators[selectedService]();
                
                // Update total price display
                totalPriceDisplay.textContent = total.toFixed(2);
                
                // Update price breakdown
                priceBreakdownDisplay.innerHTML = breakdown.map(item => `<div>${item}</div>`).join('');
            }
        }
    
        // Form submission handling
        const form = document.querySelector('.form-container');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate form inputs
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('highlight');
                    isValid = false;
                } else {
                    field.classList.remove('highlight');
                }
            });
            
            if (isValid) {
                // Collect form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    contact: document.getElementById('contact').value,
                    location: document.getElementById('location').value,
                    service: serviceSelect.value,
                    serviceDetails: getCurrentServiceDetails(),
                    totalPrice: totalPriceDisplay.textContent
                };
                
                // Here you would typically send the data to a server
                // For now, we'll just log it and show an alert
                console.log('Order Submitted:', formData);
                alert(`Order Submitted!\nTotal Price: ₱${formData.totalPrice}`);
                
                // Optional: Reset form
                form.reset();
                serviceOptions.innerHTML = '';
                totalPriceDisplay.textContent = '0.00';
                priceBreakdownDisplay.innerHTML = '';
            }
        });
    
        function getCurrentServiceDetails() {
            const selectedService = serviceSelect.value;
            const details = {};
            
            if (selectedService) {
                const optionElements = serviceOptions.querySelectorAll('select, input');
                optionElements.forEach(el => {
                    details[el.id] = el.value;
                });
            }
            
            return details;
        }
    });