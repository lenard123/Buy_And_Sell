<?php

namespace App\Http\Controllers\API\v1\Message;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\Message;

class SendController extends Controller
{

    public function __invoke (Request $request, $id)
    {
        $this->validate($request, [
            'messages' => 'required'
        ]);

        $messages = new Message;
        $messages->messages = $request->messages;
        $messages->from = $request->user()->id;
        $messages->to = $id;
        $messages->save();

        return (new GetController)->user($request, $id);        
    }
}
