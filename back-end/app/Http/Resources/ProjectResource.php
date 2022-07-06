<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,

            'supervisor' => $this->getProjectSupervisor(),
            'members' => $this->getProjectMembers(),
            'observers' => $this->getProjectObservers(),

            'priority' => $this->getProjectPriority(),
            'tasks' => $this->getProjectTasks()->count(),
            'progress' => $this->projectProgress(),
            'participation' => $this->projectParticipation(),

            'attachments' => $this->getProjectAttachments(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
