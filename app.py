from flask import Flask, request, jsonify, render_template, send_from_directory
import google.generativeai as genai
import PyPDF2
import os
import google.api_core.exceptions

app = Flask(__name__)

# Function to read PDF content
def read_pdf(file_path):
    with open(file_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        content = ""
        for page in pdf_reader.pages:
            content += page.extract_text()
    return content

# Function to get response from Gemini using the generative model
def get_gemini_response(question, pdf_content):
    try:
        model = genai.GenerativeModel('gemini-pro')  # Assuming the correct model for your use case

        # Prompt template tailored to mobile phone dataset
        prompt_template = f"""
    You are an AI assistant specializing in smartphones and laptops. Your knowledge base includes detailed specifications for various phone models, including iPhone, Samsung Galaxy, Xiaomi, and laptops. You have access to the following information:

    {pdf_content}

    Based on the above information, please answer the following user question:

    User Query: {question}

    Please follow these guidelines in your response:
    1. Provide a clear, accurate, and concise answer based on the information in the document.
    2. Include specific details such as display size, camera specifications, battery capacity, chipset, storage options, price, and release date.
    3. For comparison queries, clearly highlight the differences and similarities between the relevant models.
    4. Maintain a professional, helpful, and informative tone throughout.
    5. Suggest similar products, related models, or newer versions if relevant.
    6. If detailed information isn't available in the document, acknowledge the limitation and provide the best possible answer with the available data.
    
    Your response:
    """


        response = model.generate_content(prompt_template)
        return response.text
    except google.api_core.exceptions.ResourceExhausted:
        return "Error: API quota exceeded. Please try again later."
    except Exception as e:
        return f"Error: {str(e)}"

# Route to serve the HTML file
@app.route('/')
def index():
    return render_template('index.html')

# Flask route to process queries
@app.route('/process_query', methods=['POST'])
def process_query():
    data = request.get_json()
    question = data['question']

    # PDF file path is hardcoded to the phone dataset PDF
    pdf_path = "C:\\users\\shree\\Desktop\\CODE\\Phone dataset.pdf"  # Ensure this is the correct path on your system

    # Check if the PDF file exists
    if not os.path.exists(pdf_path):
        return jsonify({'response': f"Error: The file {pdf_path} does not exist. Please check the file path."})

    # Read PDF content
    pdf_content = read_pdf(pdf_path)

    # Get response from the Gemini model
    response = get_gemini_response(question, pdf_content)

    # Return the response
    return jsonify({'response': response})


api_key = "AIzaSyBMg3Rg15cspF5_SjEvx1EMrJfm6EM-5hY"  # Replace with your actual API key
genai.configure(api_key=api_key)

# Serve static files
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == "__main__":
    app.run(debug=True)

