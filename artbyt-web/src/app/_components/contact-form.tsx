"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { sendContactEmail } from "@/app/actions/sendEmail";
import { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    const result = await sendContactEmail(data);

    if (result.success) {
      setSubmitMessage({
        type: "success",
        text: result.message || "Meddelandet har skickats!",
      });
      reset();
    } else {
      setSubmitMessage({
        type: "error",
        text: result.error || "Ett fel uppstod",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 max-w-2xl"
    >
      {submitMessage && (
        <div
          className={`p-4 rounded-md ${
            submitMessage.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Namn
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          E-post
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Ämne
        </label>
        <input
          type="text"
          id="subject"
          {...register("subject")}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
            errors.subject ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Meddelande
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Skickar..." : "Skicka Meddelande"}
        </button>
      </div>
    </form>
  );
}
