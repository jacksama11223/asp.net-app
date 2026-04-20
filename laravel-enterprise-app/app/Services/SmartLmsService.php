<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmartLmsService
{
    protected string $baseUrl;
    protected string $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.smartlms.base_url', env('SMARTLMS_API_BASE_URL'));
        $this->apiKey = config('services.smartlms.api_key', env('SMARTLMS_API_KEY'));
    }

    /**
     * Get all courses from the .NET Backend
     */
    public function getCourses()
    {
        try {
            $response = Http::withHeaders([
                'X-API-Key' => $this->apiKey,
                'Accept' => 'application/json',
            ])->get("{$this->baseUrl}/courses");

            if ($response->successful()) {
                return $response->json();
            }

            Log::error("SmartLMS API Error: " . $response->status(), $response->json() ?? []);
            return [];
        } catch (\Exception $e) {
            Log::error("SmartLMS Connection Failed: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Create a new course in the .NET Backend
     */
    public function createCourse(array $data)
    {
        try {
            $response = Http::withHeaders([
                'X-API-Key' => $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post("{$this->baseUrl}/courses", $data);

            return [
                'success' => $response->successful(),
                'status' => $response->status(),
                'data' => $response->json(),
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }
}
