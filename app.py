# from flask import Flask, request, jsonify
# import google.generativeai as genai
# import os

# app = Flask(__name__)
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# @app.route('/get_response', methods=['POST', 'OPTIONS'])
# def get_response():
#     if request.method == 'OPTIONS':
#         return jsonify({}), 200
#     try:
#         data = request.get_json()
#         user_message = data.get('message')
#         lang = data.get('lang', 'en')

#         if not user_message:
#             return jsonify({'error': 'No message provided'}), 400

#         model = genai.GenerativeModel('gemini-pro')  # ✅ النموذج المناسب
#         response = model.generate_content(user_message)

#         return jsonify({
#             'response': response.text,
#             'source': 'gemini'
#         })
#     except Exception as e:
#         print(f"Error in /get_response: {str(e)}")
#         return jsonify({
#             'response': '❌ حدث خطأ أثناء المعالجة، جرب تاني بعد شوية.',
#             'source': 'fallback'
#         }), 200  # ✅ عشان React ما يضربش

# if __name__ == '__main__':
#     app.run(debug=True)