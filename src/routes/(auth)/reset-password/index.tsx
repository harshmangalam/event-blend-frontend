import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';

export default component$(() => {
    return (
        <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 class="text-3xl font-bold mb-6">Forgot password?</h1>
            <p class="mb-6">
                No worries! Enter the email associated with your account. We'll send you a secure link to
                reset your password.
            </p>
            <Form>
                <div class="mb-4">
                    <label for="email" class="block mb-2 font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                <div class="mb-6">
                    <div class="flex items-center border rounded p-3">
                        <input type="checkbox" id="recaptcha" class="mr-2" />
                        <label for="recaptcha">I'm not a robot</label>
                        <div class="ml-auto text-sm text-gray-500">reCAPTCHA</div>
                    </div>
                </div>
                <button type="submit" class="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                    Send reset link
                </button>
            </Form>
        </div>
    );
});