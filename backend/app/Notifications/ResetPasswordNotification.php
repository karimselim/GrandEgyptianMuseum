<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $token;

    /**
     * Create a new notification instance.
     */
    public function __construct($token)
    {
       $this->token=$token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        // Define reset password URLs for Flutter and React
        $reactResetUrl = env('FRONTEND_URL') . "/reset-password?token={$this->token}&email=" . urlencode($notifiable->email);
        $flutterResetUrl = env('FLUTTER_FRONTEND_URL') . "/reset-password?token={$this->token}&email=" . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('Reset Your Password')
            ->greeting('Hello, ' . $notifiable->name . '!')
            ->line('You requested a password reset. Click the appropriate button below:')
            ->action('Reset in React App', $reactResetUrl)
            ->line('Or if you are using Flutter:')
            ->action('Reset in Flutter App', $flutterResetUrl)
            ->line('If you did not request this, please ignore this email.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
